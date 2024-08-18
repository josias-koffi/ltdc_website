import {NextResponse} from "next/server";
import nodemailer from 'nodemailer';

export default async function mailHandler(body: any) {

    const {email, subject, message, name, company} = body;
    console.log(subject);

    let transporter = nodemailer?.createTransport({
        //@ts-expect-error type is may be not good
        host: process.env.BREVO_HOST, // Votre SMTP server

        port: process.env.BREVO_PORT,
        secure: false, // true pour 465, false pour les autres ports
        auth: {

            user: process.env.BREVO_USER, // votre identifiant SMTP

            pass: process.env.BREVO_PASWORD, // votre mot de passe SMTP
        },
    });

    try {
        let info = await transporter.sendMail({

            from: `"Expediteur" <${process.env.MAIL_DESTINNATION}>`, // adresse de l'expéditeur
            to: process.env.MAIL_DESTINNATION, // liste des destinataires
            subject: subject?.subject, // Sujet
            text: message, // corps du texte
            html: emailBodyParser(message, email, name, company), // corps HTML
        });
        console.log("Message sent: %s", info.messageId);
        return NextResponse.json({test: 'success'}, {status: 200})
    } catch (error) {
        console.error("Error sending email", error);
        return NextResponse.json({test: 'success'}, {status: 500})
    }
}

const emailBodyParser = (message: string, email: string, name: string, company: string) => {

    return `
        <div>
            <p>Bonjour,</p>
            <p>Un nouveau mail de contact vient d'être envoyé par ${name}</p>
            <p>Email de contact: ${email}</p>
            ${company ? `<p>Entreprise: ${company}</p>` : ""}
            <p>Message:<br/>${message.replace(/\n/g, '<br/>')}</p>
        </div>
    `;
}
