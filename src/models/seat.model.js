const db = require("../configs/supabase");
const moment = require("moment");

const getSeat = (location, cinemaName, showTime, showDate, titleMovie) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `SELECT s.id AS seat_id, m.title, c.id AS cinemas_id, c.name AS cinema_name, c.prices, t.show_time, TO_CHAR(t.show_date, 'YYYY-MM-DD') AS show_date, ct.name AS city_name, srn.name as seat, os.name AS status
    FROM cinemas c
    JOIN seat s ON c.id = s.cinemas_id
    JOIN time t ON c.id = t.cinemas_id
    JOIN city ct ON c.id = ct.cinema_id
    JOIN orderstatus os ON os.id = s.order_status_id
    join movies m on m.id = c.movies_id 
    JOIN seat_rows_number srn on srn.id = s.id_seat_rows_number 
    WHERE ct.name = lower($1)
    AND c.name = $2
    AND t.show_time = TO_TIMESTAMP($3, 'HH24:MI:SS')::TIME 
    AND t.show_date = TO_DATE($4, 'YYYY-MM-DD')
    and m.title = $5
    `;
    const values = [location, cinemaName, showTime, showDate, titleMovie];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const orderSeat = (dataArray) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `INSERT INTO reservation (cinemas_id, user_id, seat_id, movie_id, show_time, show_date, city_name) VALUES`;
    const values = [];
    dataArray.forEach((data, idx) => {
      if (values.length) sqlQuery += ", ";
      sqlQuery += `($${1 + 7 * idx}, $${2 + 7 * idx}, $${3 + 7 * idx}, $${
        4 + 7 * idx
      }, $${5 + 7 * idx}, $${6 + 7 * idx}, $${7 + 7 * idx})`;
      const formattedShowTime = moment(data.show_time, "h:mm A").format(
        "HH:mm:ss"
      );
      const formattedShowDate = moment(data.show_date, "YYYY-MM-DD").format(
        "YYYY-MM-DD"
      );
      values.push(
        data.cinemas_id,
        data.id,
        data.seat,
        parseInt(data.movie_id),
        formattedShowTime,
        formattedShowDate,
        data.city_name
      );
    });
    sqlQuery += ` RETURNING *`;
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const cekSeat = (dataSeat) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `SELECT srn.name as seat, os.name as status 
      FROM seat s 
      JOIN seat_rows_number srn ON srn.id = s.id_seat_rows_number
      JOIN orderstatus os on os.id = s.order_status_id  
      WHERE s.id IN (`;
    const values = [];
    dataSeat.forEach((data, idx) => {
      if (idx !== 0) sqlQuery += ",";
      sqlQuery += `$${idx + 1}`;
      values.push(data.seat);
    });
    sqlQuery += ")";
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.rows);
    });
  });
};
const cekCinema = (dataCinema) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `select id, name from cinemas where id IN (`;
    const values = [];
    dataCinema.forEach((data, idx) => {
      if (idx !== 0) sqlQuery += ",";
      sqlQuery += `$${idx + 1}`;
      values.push(data.cinemas_id);
    });
    sqlQuery += ")";
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.rows);
    });
  });
};

module.exports = {
  getSeat,
  orderSeat,
  cekSeat,
  cekCinema,
};
