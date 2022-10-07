import * as Mongoose from "mongoose";
let database: Mongoose.Connection;
export const connect: any = (uri: string) => {
  if (database) {
    return;
  }
  const option: Mongoose.ConnectOptions = {};
  Mongoose.connect(uri, option);
  database = Mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

export const disconnect: any = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};
