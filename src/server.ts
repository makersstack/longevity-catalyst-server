import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 3001;
// for check the server status
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, welcome to your server!");
});

// others
app.use("/user", userRoutes);

// listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
