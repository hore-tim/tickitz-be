const transactionModel = require("../models/transacion.model");
const db = require("../configs/supabase");
const moment = require("moment");
const getTransaction = async (req, res) => {
  try {
    const { transaction_id } = req.body;
    const result = await transactionModel.getTransaction(transaction_id);
    if (result.rows.length === 0) {
      res.status(404).json({
        msg: "transaction not found",
      });
      return;
    }
    res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

module.exports = {
  getTransaction,
};
