const db = require("../configs/supabase");
const moment = require("moment");

const getTransaction = (transacion_id) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `SELECT 
  movies.title AS movie_title,
  movies.release_date AS movie_date,
  TO_CHAR(show.showdate, 'YYYY-MM-DD') AS show_date,
  movies.category AS movie_category,
  COUNT(reservation.id) AS count,
  seat_rows_number.name AS seats,
  show.price AS price,
  transaction.status as Satus 
FROM 
  reservation 
  JOIN transaction ON reservation.transaction_id = transaction.id 
  JOIN seat ON reservation.seat_id = seat.id 
  JOIN show ON seat.show_id = show.id 
  JOIN cinemas ON show.cinemas_id = cinemas.id 
  JOIN movies ON show.movies_id = movies.id 
  JOIN seat_rows_number ON seat.id_seat_rows_number = seat_rows_number.id 
WHERE 
   transaction.id = $1
GROUP BY 
  movies.title, 
  movies.release_date, 
  show.showtime, 
  movies.category, 
  seat_rows_number.name, 
  show.price,
 transaction.status
    `;
    const values = [transacion_id];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

module.exports = {
  getTransaction,
};
