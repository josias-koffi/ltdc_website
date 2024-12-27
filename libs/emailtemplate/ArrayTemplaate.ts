import {
  BeneficiaryShipFormInterface,
  ContactInfoInterface,
  FormInterface,
  SponsorShipFormInterface,
  VolunteerShipFormInterface,
} from "@/libs/interfaces/Interfaces";

/**
 * Generates an HTML table from the provided data.
 *
 * @param {BeneficiaryShipFormInterface | SponsorShipFormInterface | VolunteerShipFormInterface} data - The data to be used to generate the HTML table.
 * @return {string} The HTML table as a string.
 */
export function generateHtmlTable(data: FormInterface): string {
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
