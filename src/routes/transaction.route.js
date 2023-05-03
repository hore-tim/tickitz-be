const { Router } = require("express");
const transactionRoute = Router();

const transactionController = require("../controllers/transaction.controller");
const authMiddleware = require("../middleware/auth");

transactionRoute.get(
  "/",
  authMiddleware.checkToken,
  transactionController.getTransaction
);
// transactionRoute.post(
//   "/order",
//   authMiddleware.checkToken,
//   transactionController.orderSeat
// );

module.exports = transactionRoute;
