const nodemailer = require("nodemailer");

const sendEmail = async options => {
  let testAccount = await nodemailer.createTestAccount();

  const message = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = await transporter.sendMail({
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  });

  const info = await transporter.sendEmail(message);

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
