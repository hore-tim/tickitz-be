const seatModel = require("../models/seat.model");
const db = require("../configs/supabase");
const moment = require("moment");
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

const orderSeat = async (req, res) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const { id } = req.authInfo;
    const { cinemas_id, seat_id, movie_id, show_time, show_date, city_name } =
      req.body;
    const dataArray = [];
    const dataSeat = [];
    const dataCinema = [];
    seat_id.forEach((seat) => {
      dataArray.push({
        cinemas_id,
        id,
        seat,
        movie_id,
        show_time,
        show_date,
        city_name,
      });
      dataSeat.push({ seat });
      dataCinema.push({ cinemas_id });
    });
    // return console.log(dataCinema);
    const cekCinema = await seatModel.cekCinema(dataCinema);
    if (cekCinema.length === 0) {
      res.status(404).json({
        msg: "Cinema Not Found",
      });
      return;
    }
    const cekSeatResult = await seatModel.cekSeat(dataSeat);
    if (cekSeatResult.length === 0) {
      res.status(404).json({
        msg: "Seat Not Found",
      });
      return;
    }
    for (let i = 0; i < cekSeatResult.length; i++) {
      const seat = cekSeatResult[i];
      if (seat.status === "Sold") {
        res.status(400).json({
          data: seat,
          msg: "Seat Sold Out",
        });
        return;
      }
    }
    const result = await seatModel.orderSeat(dataArray);
    if (result.length === 0) {
      res.status(404).json({
        msg: "Seat Not Found",
      });
      return;
    }
    await client.query("COMMIT");
    const dataResult = [];
    result.rows.forEach((data) => {
      const idx = dataResult.findIndex(
        (item) => item.cinemas_id === data.cinemas_id
      );
      if (idx >= 0) {
        dataResult[idx].seat_id.push(data.seat_id);
      } else {
        const formattedShowDate = moment(data.show_date, "YYYY-MM-DD").format(
          "YYYY-MM-DD"
        );
        dataResult.push({
          cinemas_id: data.cinemas_id,
          user_id: data.user_id,
          seat_id: [data.seat_id],
          movie_id: parseInt(data.movie_id),
          show_time: data.show_time,
          show_date: formattedShowDate,
          city_name: data.city_name,
          "created-at": data.created_at,
        });
      }
    });
    res.status(200).json({
      data: dataResult,
      msg: "Order Succes",
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error.message);
    res.status(500).json({
      msg: "Internal server error",
    });
  } finally {
    client.release();
  }
};

module.exports = {
  getSeat,
  orderSeat,
};
