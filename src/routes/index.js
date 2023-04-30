const express = require("express");
const masterRouter = express.Router();

const welcomeRouter = require("./welcome.route");
const moviesRouter = require("./movies.route")

masterRouter.use("/movies", moviesRouter);
masterRouter.use("/", welcomeRouter);

module.exports = masterRouter;
