const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config();
const AuthRoute = require("./Routes/Auth.route");

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello 👋");
});

app.use("/auth/", AuthRoute);

app.use((req, res, next) => {
  // method 1:
  // const error = new Error("Not Found");
  // error.status = 404;
  // next(error);
  // ---------------
  // Method 2: createError
  next(createError.NotFound("This rout does not exist"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
