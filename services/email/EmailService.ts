"use server";

import {
  BeneficiaryShipFormInterface,
  ContactInfoInterface,
  EmailSubjectEnum,
  EmailTemplateIdEnum,
  FormInterface,
  MailDataInterface,
  SponsorShipFormInterface,
  VolunteerShipFormInterface,
} from "@/libs/interfaces/Interfaces";
import { generateHtmlTable } from "@/libs/emailtemplate/ArrayTemplaate";
import { generateHtmlFromJsonForBeneficiary } from "@/libs/emailtemplate/BeneficiaryEmailtemplate";

const URL = process.env.BREVO_API_URL;
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const DESTINATION = process.env.MAIL_DESTINNATION;

/**
 * Sends an email using the provided mail data.
 *
 * @param {MailDataInterface} mailData - The data needed to send the email.
 * @returns {Promise<{ response: string }>} A promise that resolves with an object containing the response message.
 */
async function sendEmail(
  mailData: MailDataInterface,
): Promise<{ response: string }> {
  if (!URL || !BREVO_API_KEY || !DESTINATION) {
    throw new Error("Missing environment key");
  }

  try {
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(mailData),
    });

    return { response: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email", error);
    return { response: "Error sending email" };
  }
}

/**
 * Sends an email with the provided data and subject.
 *
 * @param {BeneficiaryShipFormInterface | SponsorShipFormInterface | VolunteerShipFormInterface | ContactInfoInterface} body - The data to be included in the email.
 * @param {EmailSubjectEnum} subject - The subject of the email.
 * @returns {Promise<{ response: string }>} A promise that resolves with a success message after sending the email.
 */
export default async function mailHandler(
  body: FormInterface,
  subject: EmailSubjectEnum,
): Promise<{ response: string }> {
  if (!URL || !BREVO_API_KEY || !DESTINATION) {
    throw new Error("Missing environment key");
  }

  const mailData: MailDataInterface = {
    sender: { name: "Info Service", email: DESTINATION },
    to: [{ name: "Info Service", email: DESTINATION }], // Remplacez par le destinataire réel
    subject: subject,
    htmlContent: createCorrespondingRequestBody(body),
  };

  await sendEmail(mailData);
  await responseMailToUser(body, subject);

  return { response: "Email sent successfully" };
}

/**
 * Sends an automatic response email to the user with the provided contact information.
 *
 * @param {BeneficiaryShipFormInterface | SponsorShipFormInterface | VolunteerShipFormInterface | ContactInfoInterface} contactInfo - The contact information of the user.
 * @param subject
 * @returns {Promise<{ response: string }>} A promise that resolves with a success message after sending the email.
 */
const responseMailToUser = async (
  contactInfo: FormInterface,
  subject: EmailSubjectEnum,
): Promise<{ response: string }> => {
  if (!URL || !BREVO_API_KEY || !DESTINATION) {
    throw new Error("Missing environment key");
  }

  let templateId = EmailTemplateIdEnum.Automatic_response;

  if (subject === EmailSubjectEnum.Demande_de_pour_la_maraude) {
    templateId = EmailTemplateIdEnum.Reponse_automatique_maraude;
  }

  if (subject === EmailSubjectEnum.Demande_de_beneficiaire) {
    templateId = EmailTemplateIdEnum.Reponse_Formulaire_Beneficiaire;
  }

  const mailData: MailDataInterface = {
    sender: { name: "Association LTDC", email: DESTINATION },
    to: [{ name: contactInfo.name, email: contactInfo.email }],
    subject,
    templateId,
    params: contactInfo,
  };

  await sendEmail(mailData);

  return { response: "Email sent successfully" };
};

const createCorrespondingRequestBody = (body: FormInterface) => {
  if ("beneficiarySpecificField" in body) {
    // Vérifiez un champ spécifique unique à BeneficiaryShipFormInterface
    return generateHtmlFromJsonForBeneficiary(
      body as BeneficiaryShipFormInterface,
    );
  } else if ("sponsorSpecificField" in body) {
    // Vérifiez un champ spécifique unique à SponsorShipFormInterface
    return generateHtmlTable(body as SponsorShipFormInterface);
  } else if ("volunteerSpecificField" in body) {
    // Vérifiez un champ spécifique unique à VolunteerShipFormInterface
    return generateHtmlTable(body as VolunteerShipFormInterface);
  } else if ("contactSpecificField" in body) {
    // Vérifiez un champ spécifique unique à ContactInfoInterface
    return generateHtmlTable(body as ContactInfoInterface);
  } else {
    throw new Error("Unrecognized form type");
  }
};
