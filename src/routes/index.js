const express = require("express");
const masterRouter = express.Router();

const welcomeRouter = require("./welcome.route");
const authRouter = require("./auth.route");

masterRouter.use("/", welcomeRouter);
masterRouter.use("/auth", authRouter);

module.exports = masterRouter;
