const db = require("../configs/supabase");
const moment = require("moment");

const getTransaction = (transacion_id) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = ` SELECT
  transaction.id as transaction_id,
  movies.title AS movie_title,
  movies.release_date AS movie_date,
  cb."name" as cinemas_name,
  TO_CHAR(show.showdate, 'YYYY-MM-DD') AS show_date,
  show.showtime as show_time,
  movies.category AS movie_category,
  reservation.id as reservation_id,
  seat_rows_number.name AS seats,
  show.prices AS price,
  transaction.status as status 
FROM 
  reservation 
  JOIN transaction ON reservation.transaction_id = transaction.id 
  JOIN seat ON reservation.seat_id = seat.id 
  JOIN show ON seat.show_id = show.id 
  JOIN cinemas ON show.cinemas_id = cinemas.id 
  join cinemasbrand cb on cinemas.cinemas_brand_id = cb.id
  JOIN movies ON show.movies_id = movies.id 
  JOIN seat_rows_number ON seat.id_seat_rows_number = seat_rows_number.id 
WHERE 
   transaction.id = $1
GROUP BY 
  transaction.id,
  movies.title, 
  movies.release_date, 
  cb.name,
  show.showtime, 
  show.showdate,
  reservation.id,
  movies.category, 
  seat_rows_number.name, 
  show.prices,
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

const createTransaction = (transacion_id, payment_id) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = ` update "transaction" set payment_id = $1, status = 'paid' where id = $2 RETURNING *
    `;
    const values = [payment_id, transacion_id];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const cekPayment = (payment_id) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = ` select name from payment p where id = $1
    `;
    const values = [payment_id];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const getPayment = () => {
  return new Promise((resolve, reject) => {
    let sqlQuery = ` select * from payment p 
    `;
    db.query(sqlQuery, (err, result) => {
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
  createTransaction,
  cekPayment,
  getPayment,
};
