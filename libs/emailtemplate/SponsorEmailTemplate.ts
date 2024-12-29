import { SponsorShipFormInterface } from "@/libs/interfaces/Interfaces";

export function generateHtmlFromJsonForSponsor(
  jsonData: SponsorShipFormInterface,
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
                                Formulaire de Partenariat
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
                                Informations du Sponsor
                            </h3>
                            <p><strong>Nom, prénom :</strong> ${jsonData?.name} ${jsonData?.firstName}</p>
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
                                Organisation
                            </h3>
                            <p><strong>Nom de l'organisation :</strong> ${jsonData?.organization}</p>
                            <p><strong>Secteur :</strong> ${jsonData?.sector}</p>
                            <p><strong>Adresse de l'organisation :</strong> ${jsonData?.organizationAddress}</p>
                            <p><strong>Téléphone de l'organisation :</strong> ${jsonData?.organizationPhone}</p>
                            <p><strong>Email de l'organisation :</strong> ${jsonData?.organizationEmail}</p>
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
                                Partenariat
                            </h3>
                            <p><strong>Motivation :</strong> ${jsonData?.motivation}</p>
                            <p><strong>Type de partenariat :</strong> ${jsonData?.partnershipType}</p>
                            <p>
                                <strong>Compétences et ressources :</strong>
                                ${jsonData?.skillsAndRessources}
                            </p>
                            <p>
                                <strong>Expériences en partenariat :</strong>
                                ${jsonData?.partnershipExperiences}
                            </p>
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
