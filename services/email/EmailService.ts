"use server";

import {
  BeneficiaryShipFormInterface,
  ContactInfoInterface,
  EmailSubjectEnum,
  EmailTemplateIdEnum,
  MailDataInterface,
  SponsorShipFormInterface,
  VolunteerShipFormInterface,
} from "@/libs/interfaces/Interfaces";

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
    const response = await fetch(URL, {
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
  body:
    | BeneficiaryShipFormInterface
    | SponsorShipFormInterface
    | VolunteerShipFormInterface
    | ContactInfoInterface,
  subject: EmailSubjectEnum,
): Promise<{ response: string }> {
  if (!URL || !BREVO_API_KEY || !DESTINATION) {
    throw new Error("Missing environment key");
  }

  const mailData: MailDataInterface = {
    sender: { name: "Info Service", email: DESTINATION },
    to: [{ name: "Info Service", email: DESTINATION }], // Remplacez par le destinataire réel
    subject: subject,
    htmlContent: generateHtmlTable(body),
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
  contactInfo:
    | BeneficiaryShipFormInterface
    | SponsorShipFormInterface
    | VolunteerShipFormInterface
    | ContactInfoInterface,
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

/**
 * Generates an HTML table from the provided data.
 *
 * @param {BeneficiaryShipFormInterface | SponsorShipFormInterface | VolunteerShipFormInterface} data - The data to be used to generate the HTML table.
 * @return {string} The HTML table as a string.
 */
function generateHtmlTable(
  data:
    | BeneficiaryShipFormInterface
    | SponsorShipFormInterface
    | VolunteerShipFormInterface
    | ContactInfoInterface,
): string {
  // Create table rows
  const rows = Object.entries(data)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        value = value.join(", ");
      } else if (typeof value === "boolean") {
        value = value ? "Oui" : "Non";
      }
      return `<tr><td><strong>${key}</strong></td><td>${value}</td></tr>`;
    })
    .join("");

  // Generate the HTML table
  return `
        <table border="1" cellpadding="5" cellspacing="0">
            ${rows}
        </table>
    `;
}
