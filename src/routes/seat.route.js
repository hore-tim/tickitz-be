const { Router } = require("express");
const seatRouter = Router();

const seatController = require("../controllers/seat.controller");
const authMiddleware = require("../middleware/auth");

seatRouter.get("/all", authMiddleware.checkToken, seatController.getSeat);

module.exports = seatRouter;
