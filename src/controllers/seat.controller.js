const seatModel = require("../models/seat.model");

const getSeat = async (req, res) => {
  try {
    const { location, cinemaName, showTime, showDate, titleMovie } = req.body;
    const result = await seatModel.getSeat(
      location,
      cinemaName,
      showTime,
      showDate,
      titleMovie
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        msg: "Seat Not Found",
      });
      return;
    }
    // console.log(result);
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
  getSeat,
};
