import { connect } from "mongoose";

//const DB_URI = "mongodb://" + "localhost:27017/Note";

const DB_URI = "mongodb://" + process.env.DB_URI;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

module.exports = () => {
  const db = async () => {
    await connect(
      DB_URI,
      {
        authSource: "admin",
        user: DB_USER,
        pass: DB_PASS,
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("DB connected");
        }
      }
    );
  };

  db();
};
