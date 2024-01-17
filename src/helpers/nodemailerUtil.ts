import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  // Your email configuration
});

export const sendEmail = (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: "your-email@example.com",
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};
