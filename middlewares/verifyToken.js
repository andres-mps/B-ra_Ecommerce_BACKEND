const { expressjwt: checkJwt } = require("express-jwt");

const verifyToken = checkJwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] });

module.exports = verifyToken;
