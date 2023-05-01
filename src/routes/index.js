const express = require("express");
const masterRouter = express.Router();

const welcomeRouter = require("./welcome.route");
<<<<<<< HEAD
const moviesRouter = require("./movies.route")
=======
const authRouter = require("./auth.route");
const profileRouter = require("./profile.route");
const bookingRouter = require("./booking.route");
const seatRouter = require("./seat.route");
>>>>>>> edac1bf7a1b276e33fe0e080ffb957761b79204a

masterRouter.use("/movies", moviesRouter);
masterRouter.use("/", welcomeRouter);
masterRouter.use("/auth", authRouter);
masterRouter.use("/profile", profileRouter);
masterRouter.use("/booking", bookingRouter);
masterRouter.use("/seat", seatRouter);

module.exports = masterRouter;
