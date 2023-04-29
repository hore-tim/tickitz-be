const express = require("express");
const masterRouter = express.Router();

const welcomeRouter = require("./welcome.route");
const authRouter = require("./auth.route");
const profileRouter = require("./profile.route");

masterRouter.use("/", welcomeRouter);
masterRouter.use("/auth", authRouter);
masterRouter.use("/profile", profileRouter);
module.exports = masterRouter;
