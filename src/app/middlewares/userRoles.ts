// import { NextFunction, Request, Response } from "express";

// Middleware for checking user roles
// export function checkUserRole(role) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const userRole = req.user.role;

//     if (userRole === role) {
//       next();
//     } else {
//       res.status(403).json({ message: "Permission denied" });
//     }
//   };
// }
