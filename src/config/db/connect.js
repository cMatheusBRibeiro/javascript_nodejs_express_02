import mongoose from "mongoose";

const databaseConnect = async () => {
  mongoose.connect(process.env.DB_CONNECTION_STRING);

  mongoose.connection.on("error", (error) => {
    console.error("Database Connection Error", error);
  });

  mongoose.connection.once("open", () => {
    console.log("Database Connection Success");
  });

  return mongoose.connection;
};

export default databaseConnect;
