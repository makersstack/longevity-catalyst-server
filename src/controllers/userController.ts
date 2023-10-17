import { Request, Response } from "express";
import { db } from "../db";

export const createUser = (req: Request, res: Response) => {
  const { username, full_name, email, role_id, password } = req.body;
  const user = { username, full_name, email, role_id, password };
  const sql = "INSERT INTO users SET ?";

  db.query(sql, user, (err, result) => {
    if (err) {
      res.status(400).send("Error in user signup");
    } else {
      res.status(200).send("User signed up successfully");
    }
  });
};

export const getUsers = (req: Request, res: Response) => {
  const sql = "SELECT * FROM users";

  db.query(sql, (err, result) => {
    if (err) {
      res.status(400).send("Error in fetching users");
    } else {
      res.status(200).json(result);
    }
  });
};

export const getUserById = (req: Request, res: Response) => {
  const id = req.params.id;
  const sql = "SELECT * FROM users WHERE id = ?";

  db.query(sql, id, (err, result) => {
    if (err) {
      res.status(400).send("Error in fetching user by ID");
    } else {
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).send("User not found");
      }
    }
  });
};
