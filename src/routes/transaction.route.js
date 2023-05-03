const { Router } = require("express");
const transactionRoute = Router();

const transactionController = require("../controllers/transaction.controller");
const authMiddleware = require("../middleware/auth");

transactionRoute.get(
  "/",
  authMiddleware.checkToken,
  transactionController.getTransaction
);
transactionRoute.patch(
  "/",
  authMiddleware.checkToken,
  transactionController.createTransaction
);
transactionRoute.get(
  "/payment",
  authMiddleware.checkToken,
  transactionController.getPayment
);
// transactionRoute.post(
//   "/order",
//   authMiddleware.checkToken,
//   transactionController.orderSeat
// );

module.exports = transactionRoute;
