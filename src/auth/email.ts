import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendEmail(
    to: string,
    subject: string,
    html: string,
) {
    await transporter.sendMail({
        from: `"Nest Auth API" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });
}