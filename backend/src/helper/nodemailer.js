
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "9a16fada0ea81b",
        pass: "317145576c92a3"
    }
});

export const sendmail = async ({ to, subject, html }) => {
    const info = await transporter.sendMail({
        from: "<company@test.email>",
        to,
        subject,
        text: "This is a text email",
        html
    });
    console.log("Mail sent", info.messageId, info.messageSize);
};
