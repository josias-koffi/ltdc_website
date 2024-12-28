import { BeneficiaryShipFormInterface } from "@/libs/interfaces/Interfaces";

export function generateHtmlFromJsonForBeneficiary(
  jsonData: BeneficiaryShipFormInterface,
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
                                Formulaire d'Information Personnelle
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
                                Information sur le bénéficiaire
                            </h3>
                            <p><strong>Nom, prénom :</strong> ${jsonData?.name} ${jsonData?.firstName}</p>
                            <p><strong>Date de naissance :</strong> ${jsonData?.birthday}</p>
                            <p>
                                <strong>Genre :</strong>
                                ${jsonData?.gender}
                            </p>
                            <p><strong>Numéro de téléphone :</strong> ${jsonData?.phoneNumber}</p>
                            <p><strong>Email :</strong> ${jsonData?.email}</p>
                            <p><strong>Adresse :</strong> ${jsonData?.adress}</p>
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
                                Situation familiale
                            </h3>
                            <p>
                                <strong>Statut :</strong> ${jsonData?.statut}
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
                                Documents Administratifs
                            </h3>
                            <p>
                                <strong>OQTF reçue :</strong> ${jsonData?.oqtf}
                            </p>
                            <p><strong>Date de réception de l'OQTF :</strong> ${jsonData?.oqtfReceptionDate}</p>
                            <p>
                                <strong>Demande de titre de séjour en cours :</strong> ${jsonData?.residentPermitPending}
                            </p>
                            <p><strong>Date de la demande :</strong> ${jsonData?.residentPermitRequestDate}</p>
                            <p><strong>Statut actuel :</strong> ${jsonData?.actualStatut}</p>
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
                                Expérience Professionnelle
                            </h3>
                            <p>
                                <strong>Avez-vous un emploi actuel ?</strong> ${jsonData?.working}
                            </p>
                            <p>
                                <strong>Si oui, quel est votre poste ?</strong> ${jsonData?.workTitle}
                            </p>
                            <p>
                                <strong
                                    >Avez-vous travaillé en intérim ou en CDD ?</strong
                                >
                                ${jsonData?.cddOrInterim}
                            </p>
                            <p>
                                <strong>Pouvez-vous fournir un justificatif ?</strong>
                                ${jsonData?.workProof}
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
                                Formation
                            </h3>
                            <p><strong>Niveau d'études :</strong> ${jsonData?.degree}</p>
                            <p>
                                <strong>Formation en cours :</strong> ${jsonData?.formationInProgress}
                            </p>
                            <p><strong>Si oui, précisez :</strong> ${jsonData?.formationPrecision}</p>
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
                                Besoin en Logement
                            </h3>
                            <p>
                                <strong>Avez-vous un logement stable ?</strong> ${jsonData?.stablePlace}
                            </p>
                            <p>
                                <strong
                                    >Avez-vous besoin d'assistance pour le logement
                                    ?</strong
                                >
                                ${jsonData?.helpForSearchPlace}
                            </p>
                            <p>
                                <strong
                                    >Avez-vous des membres de la famille avec un titre
                                    de séjour en France ?</strong
                                >
                                ${jsonData?.familyInFrance}
                            </p>
                            <p>
                                <strong>Si oui, précisez :</strong> ${jsonData?.familyLink}
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
                                Autres Informations Utiles
                            </h3>
                            <p>${jsonData?.moreInfo}</p>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    `;
}
