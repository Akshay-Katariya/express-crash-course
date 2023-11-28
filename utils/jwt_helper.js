const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = "1234567890";
      const options = {
        expiresIn: "30m",
        issuer: "https://akshay-katariya.github.io/portfolio",
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
};
