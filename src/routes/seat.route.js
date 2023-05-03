const { Router } = require("express");
const seatRouter = Router();

const seatController = require("../controllers/seat.controller");
const authMiddleware = require("../middleware/auth");

seatRouter.get("/all", seatController.getSeat);
seatRouter.post("/order", authMiddleware.checkToken, seatController.orderSeat);

module.exports = seatRouter;
