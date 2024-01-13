// import { Request, Response } from "express";
// import { sendVerificationEmail } from "../user.services";
// import User from "./email.modle";

// export const sendVerificationEmailController = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const { email, verificationToken } = req.body;

//   try {
//     // Update the user's verification token in the database
//     await User.update({ verificationToken }, { where: { email } });

//     // Send the verification email
//     await sendVerificationEmail(email, verificationToken);

//     return res.json({ message: "Verification email sent successfully." });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };
