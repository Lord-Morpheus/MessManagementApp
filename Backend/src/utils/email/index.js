import nodemailer from "nodemailer";

const sendEmail = async (props) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            // service: process.env.SMTP_SERVICE,
            port: process.env.SMTP_PORT,
            // secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: props.mail,
            subject: props.subject,
            text: props.text,
        });

        return info.response;

    } catch (error) {
        console.log(error, "email not sent");
    }
};

export default sendEmail;