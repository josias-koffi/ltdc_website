import { ContactInfoInterface } from "@/libs/interfaces/Interfaces";

export function generateHtmlFromJsonForContact(
  jsonData: ContactInfoInterface,
): string {
  return `
        <!DOCTYPE html>
        <html lang="fr">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Formulaire de Contact</title>
            </head>
            <body
                style="
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f9f9f9;
                "
            >
                <table
                    style="
                        max-width: 600px;
                        margin: 20px auto;
                        background: #fff;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        padding: 20px;
                    "
                >
                    <tr>
                        <td style="text-align: center; padding: 10px">
                            <h1 style="color: #6d35ac; font-size: 24px">
                                Nouveau Message de Contact
                            </h1>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3
                                style="
                                    color: #ff7f00;
                                    border-bottom: 2px solid #ff7f00;
                                    padding-bottom: 5px;
                                "
                            >
                                Détails du Contact
                            </h3>
                            <p><strong>Nom :</strong> ${jsonData?.name}</p>
                            <p><strong>Email :</strong> ${jsonData?.email}</p>
                            <p><strong>Entreprise :</strong> ${jsonData?.company || "Non spécifié"}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3
                                style="
                                    color: #ff7f00;
                                    border-bottom: 2px solid #ff7f00;
                                    padding-bottom: 5px;
                                "
                            >
                                Sujet et Message
                            </h3>
                            <p><strong>Sujet :</strong> ${jsonData?.subject || "Non spécifié"}</p>
                            <p><strong>Message :</strong> ${
                              jsonData?.message || "Pas de message"
                            }</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3
                                style="
                                    color: #ff7f00;
                                    border-bottom: 2px solid #ff7f00;
                                    padding-bottom: 5px;
                                "
                            >
                                Consentement
                            </h3>
                            <p><strong>Consentement :</strong> ${
                              jsonData?.consent ? "Oui" : "Non"
                            }</p>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    `;
}
