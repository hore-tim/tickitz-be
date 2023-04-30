const bookingModel = require("../models/booking.model");
const db = require("../configs/supabase");
const getBooking = async (req, res) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const { authInfo } = req;
    // await authModels.createBlackList(authInfo.token);
    const result = await bookingModel.getBooking();
    await client.query("COMMIT");
    res.status(200).json({
      msg: "Log Out Berhasil",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  } finally {
    client.release();
  }
};

module.exports = {
  getBooking,
};
