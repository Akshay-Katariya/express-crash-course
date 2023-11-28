const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB_URI, { dbName: process.env.MONGO_DB_NAME })
  .then(() => console.log("Mongo DB connected"))
  .catch((e) => console.log(e.message));

mongoose.connection.on("connected", () =>
  console.log("Mongoose connected to DB")
);

mongoose.connection.on("error", (e) => console.log(e.message));

mongoose.connection.on("disconnected", () =>
  console.log("Mongoose connection disconnected")
);

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
