"use server";

import nodemailer from "nodemailer";
import {
  BeneficiaryShipFormInterface,
  ContactInfoInterface,
  MailSubjectInterface,
  SponsorShipFormInterface,
  VolunteerShipFormInterface,
} from "@/libs/interfaces/mailType";

const config = {
  BREVO_HOST: "smtp-relay.brevo.com",
  BREVO_PORT: 587,
  BREVO_USER: "79de59001@smtp-brevo.com",
  BREVO_PASWORD:
    "xsmtpsib-e78ca9087f92fa09b2c3cae2bddc9448e6028b4f730b8384a654a65aa53022ec-GcvPFjma90r5t3gs",
  BREVO_API_KEY:
    "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",
  MAIL_DESTINNATION: "info.service@asso-ltdc.org",
};

export default async function mailHandler(
  body:
    | BeneficiaryShipFormInterface
    | SponsorShipFormInterface
    | VolunteerShipFormInterface
    | ContactInfoInterface,
  subject: MailSubjectInterface["subject"],
) {
  const { email, message, name } = body;

  let transporter = nodemailer?.createTransport({
    host: config.BREVO_HOST, // Votre SMTP server

    port: config.BREVO_PORT,
    secure: false, // true pour 465, false pour les autres ports
    auth: {
      user: config.BREVO_USER, // votre identifiant SMTP
      pass: config.BREVO_PASWORD, // votre mot de passe SMTP
    },
  });

  try {
    let info = await transporter.sendMail({
      from: `"Expediteur" <${config.MAIL_DESTINNATION}>`, // adresse de l'expéditeur
      to: config.MAIL_DESTINNATION, // liste des destinataires
      subject: subject, // Sujet
      text: message, // corps du texte
      html: generateHtmlTable(body), // corps HTML
    });
    console.log(info);
    return info;
  } catch (error) {
    console.error("Error sending email", error);
    return { response: "error sending" };
  }
}

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
