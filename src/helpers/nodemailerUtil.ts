// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   port: 465,
//   host: "smtp.gmail.com",
//   auth: {
//     user: "shihab.warfaze@gmail.com",
//   },
//   secure: true,
// });

// export const sendEmail = async (to: string, subject: string, html: string) => {
//   const mailOptions = {
//     from: "shihab.warfaze@gmail.com",
//     to,
//     subject,
//     html,
//   };
//   try {
//     const result = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", result);
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw error;
//   }
// };
