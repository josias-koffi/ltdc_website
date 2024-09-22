"use server";

import {
  BeneficiaryShipFormInterface,
  ContactInfoInterface,
  MailSubjectInterface,
  SponsorShipFormInterface,
  VolunteerShipFormInterface,
} from "@/libs/interfaces/Interfaces";

export default async function mailHandler(
  body:
    | BeneficiaryShipFormInterface
    | SponsorShipFormInterface
    | VolunteerShipFormInterface
    | ContactInfoInterface,
  subject: MailSubjectInterface["subject"],
) {
  const URL = process.env.BREVO_API_URL;
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const DESTINATION = process.env.MAIL_DESTINNATION;

  const mailData: any = {
    sender: { name: "Info Service", email: DESTINATION },
    to: [{ name: "Info Service", email: DESTINATION }], // Replace with actual recipient
    subject: subject,
    htmlContent: generateHtmlTable(body),
  };

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

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return { response: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email", error);
    return { response: "Error sending email" };
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
