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
    const dataResult = [];
    result.rows.forEach((data) => {
      const idx = dataResult.findIndex((item) => item.id === data.user_id);
      if (idx >= 0) {
        dataResult[idx].seat_id.push(data.seat_id);
        dataResult[idx].id.push(data.id);
      } else {
        dataResult.push({
          id: [data.id],
          transaction_id: createTransaction[0].id,
          user_id: data.user_id,
          seat_id: [data.seat_id],
          payment_id: null,
          "created-at": data.created_at,
        });
      }
    });
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
