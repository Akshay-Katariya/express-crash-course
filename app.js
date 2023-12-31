const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const { verifyAccessToken } = require("./Utils/jwt_helper");
require("dotenv").config();
require("./utils/init_mongodb");

const AuthRoute = require("./Routes/Auth.route");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to support form data

app.get("/", verifyAccessToken, (req, res) => {
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
