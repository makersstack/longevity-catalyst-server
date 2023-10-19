import { Request, Response } from "express"; // Import the necessary types
import app from "../../../app";

export const getUsers = (req: Request, res: Response) => {
  const db = app.get("mysqlConnection");
  const sql = "SELECT * FROM users";

  // db.query(sql)
  //   .then(err, rows, fields) => {
  //     res.status(200).json(rows);
  //   })
  //   .catch((err) => {
  //     console.error("Error in fetching users:", err);
  //     res.status(500).send("Internal Server Error");
  //   });

  db.query(sql, function (err: any, rows: any, fields: any) {
    if (err) {
      res.status(500).send(err);
    } else if (rows) {
      res.status(200).json(rows);
    } else if (fields) {
      res.status(200).json(fields);
    }
  });
};

// export const getUsers = (req: Request, res: Response) => {
//   const db = app.get("mysqlConnection");
//   // console.log("mysqlConnection value:", db);

//   res.status(200).json({ app: db });
// };
