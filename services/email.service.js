import transporter from '../config/mailer.js'

export const sendEmail = async ({ to, subject, html }) => {
    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
    })
}
