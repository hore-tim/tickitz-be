// const db = require("../configs/supabase");

// const getSeat = (idSeat) => {
//   return new Promise((resolve, reject) => {
//     let sqlQuery = `SELECT s.name
//     FROM seat s
//     LEFT JOIN order_seat os ON s.id = os.seat_id
//     LEFT JOIN "order" o ON os.order_id = o.id
//     LEFT JOIN movies m ON o.movie_id = m.id
//     LEFT JOIN media md ON m.media_id = md.id
//     LEFT JOIN showtime st ON md.showtime_id = st.id
//     WHERE st.time = '2023-05-01 20:00:00' -- waktu pertunjukan
//     AND md.id = 1 -- ID media (bioskop) yang menampilkan pertunjukan
//     AND os.seat_id IS NULL -- hanya tampilkan kursi yang belum dipesan
//     `;
//     db.query(sqlQuery, [idSeat], (err, result) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve(result);
//     });
//   });
// };

// module.exports = {
//   getSeat,
// };
