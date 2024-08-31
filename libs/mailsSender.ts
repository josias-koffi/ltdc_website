"use server";

import nodemailer from "nodemailer";
import {
  BeneficiaryShipFormInterface,
  ContactInfoInterface,
  MailSubjectInterface,
  SponsorShipFormInterface,
  VolunteerShipFormInterface,
} from "@/libs/interfaces/mailType";

export default async function mailHandler(
  body:
    | BeneficiaryShipFormInterface
    | SponsorShipFormInterface
    | VolunteerShipFormInterface
    | ContactInfoInterface,
  subject: MailSubjectInterface["subject"],
) {
  let transporter = nodemailer?.createTransport({
    // @ts-expect-error  Object literal may only specify known properties, and 'host' does not exist in type 'TransportOptions | Transport<unknown>'
    host: process?.env?.BREVO_HOST, // Votre SMTP server

    port: process?.env?.BREVO_PORT,
    secure: true, // true pour 465, false pour les autres ports
    auth: {
      user: process?.env?.BREVO_USER, // votre identifiant SMTP
      pass: process?.env?.BREVO_PASWORD, // votre mot de passe SMTP
    },
  });

  try {
    let info = await transporter.sendMail({
      from: `"Expediteur" <${process?.env?.MAIL_DESTINNATION}>`, // adresse de l'expéditeur
      to: process?.env?.MAIL_DESTINNATION, // liste des destinataires
      subject: subject, // Sujet
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
