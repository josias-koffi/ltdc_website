import { VolunteerShipFormInterface } from "@/libs/interfaces/Interfaces";

export function generateHtmlFromJsonForVolunteer(
  jsonData: VolunteerShipFormInterface,
): string {
  return `
        <!DOCTYPE html>
        <html lang="fr">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Formulaire Email</title>
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
                                Formulaire de Volontariat
                            </h1>
                            <h2 style="color: #ff7f00">
                                Association LTDC "Les Travailleurs du Coeur"
                            </h2>
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
                                Informations Personnelles
                            </h3>
                            <p><strong>Nom, prénom :</strong> ${jsonData?.name} ${jsonData?.firstName}</p>
                            <p><strong>Date de naissance :</strong> ${
                              typeof jsonData?.birthday === "string"
                                ? jsonData?.birthday
                                : jsonData?.birthday.format("DD/MM/YYYY")
                            }</p>
                            <p><strong>Nationalité :</strong> ${jsonData?.nationality}</p>
                            <p><strong>Adresse :</strong> ${jsonData?.adresse}</p>
                            <p><strong>Numéro de téléphone :</strong> ${jsonData?.phoneNumber}</p>
                            <p><strong>Email :</strong> ${jsonData?.email}</p>
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
                                Disponibilités
                            </h3>
                            <p><strong>Jours disponibles :</strong> ${
                              jsonData?.days && jsonData?.days.length > 0
                                ? jsonData?.days.join(", ")
                                : "Non spécifié"
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
                                Motivation et Compétences
                            </h3>
                            <p><strong>Motivation :</strong> ${jsonData?.motivation}</p>
                            <p><strong>Expériences :</strong> ${jsonData?.experiences}</p>
                            <p><strong>Compétences :</strong> ${jsonData?.skills}</p>
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
                            <p><strong>Consentement :</strong> ${jsonData?.consent ? "Oui" : "Non"}</p>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    `;
}
