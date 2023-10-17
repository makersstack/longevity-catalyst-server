import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lcdb",
});

const connectDB = () => {
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("MySQL connected");
  });
};

export { connectDB, db };
