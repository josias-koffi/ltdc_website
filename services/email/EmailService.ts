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
import { generateHtmlTable } from "@/libs/emailtemplate/ArrayTemplate";
import { generateHtmlFromJsonForBeneficiary } from "@/libs/emailtemplate/BeneficiaryEmailTemplate";
import { generateHtmlFromJsonForSponsor } from "@/libs/emailtemplate/SponsorEmailTemplate";
import { generateHtmlFromJsonForVolunteer } from "@/libs/emailtemplate/VolunteerEmailTemplate";
import { generateHtmlFromJsonForContact } from "@/libs/emailtemplate/ContactEmailTemplate";

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
    console.error("[EmailService] Missing env vars — URL:", URL, "DESTINATION:", DESTINATION, "API_KEY set:", !!BREVO_API_KEY);
    throw new Error("Missing environment key");
  }

  const payload = JSON.stringify(mailData);
  console.log("[EmailService] Sending to:", URL);
  console.log("[EmailService] API key prefix:", BREVO_API_KEY.slice(0, 12) + "...");
  console.log("[EmailService] Payload:", payload);

  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: payload,
    });

    const responseText = await res.text();
    console.log("[EmailService] Brevo status:", res.status, res.statusText);
    console.log("[EmailService] Brevo response body:", responseText);

    if (!res.ok) {
      console.error("[EmailService] Brevo API error — status:", res.status, "body:", responseText);
      throw new Error(`Brevo API error ${res.status}: ${responseText}`);
    }

    console.log("[EmailService] Email sent successfully to:", mailData.to.map((t) => t.email).join(", "));
    return { response: "Email sent successfully" };
  } catch (error) {
    console.error("[EmailService] fetch threw:", error);
    throw error;
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

  console.log("[EmailService] mailHandler — subject:", subject, "form type:", Object.keys(body).find(k => k.endsWith("SpecificField")));
  await sendEmail(mailData);
  await responseMailToUser(body, subject);

  console.log("[EmailService] Both emails dispatched for subject:", subject);
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
    return generateHtmlFromJsonForSponsor(body as SponsorShipFormInterface);
  } else if ("volunteerSpecificField" in body) {
    // Vérifiez un champ spécifique unique à VolunteerShipFormInterface
    return generateHtmlFromJsonForVolunteer(body as VolunteerShipFormInterface);
  } else if ("contactSpecificField" in body) {
    // Vérifiez un champ spécifique unique à ContactInfoInterface
    return generateHtmlFromJsonForContact(body as ContactInfoInterface);
  } else {
    throw new Error("Unrecognized form type");
  }
};
