const express = require("express");
const masterRouter = express.Router();

const welcomeRouter = require("./welcome.route");
const moviesRouter = require("./movies.route")
const authRouter = require("./auth.route");
const profileRouter = require("./profile.route");
const bookingRouter = require("./booking.route");
const seatRouter = require("./seat.route");

masterRouter.use("/movies", moviesRouter);
masterRouter.use("/", welcomeRouter);
masterRouter.use("/auth", authRouter);
masterRouter.use("/profile", profileRouter);
masterRouter.use("/booking", bookingRouter);
masterRouter.use("/seat", seatRouter);

module.exports = masterRouter;
