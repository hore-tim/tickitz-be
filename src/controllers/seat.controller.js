// const seatModel = require("../models/seat.model");

// const getSeat = async (req, res) => {
//   try {
//     const { seat_id } = req.body;
//     const result = await seatModel.getSeat(seat_id);
//     if (result.rows.length === 0) {
//       res.status(404).json({
//         data: result.rows,
//         msg: "Users Tidak Ditemukan",
//       });
//       return;
//     }
//     res.status(200).json({
//       data: result.rows,
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({
//       msg: "Internal server error",
//     });
//   }
// };
