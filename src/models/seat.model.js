const db = require("../configs/supabase");

const getSeat = (location, cinemaName, showTime, showDate, titleMovie) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `SELECT s.id AS seat_id, m.title, c.name AS cinema_name, c.prices, t.show_time, TO_CHAR(t.show_date, 'YYYY-MM-DD') AS show_date, ct.name AS city_name, s.rows, s.number, os.name AS status
    FROM cinemas c
    JOIN seat s ON c.id = s.cinemas_id
    JOIN time t ON c.id = t.cinemas_id
    JOIN city ct ON c.id = ct.cinema_id
    JOIN orderstatus os ON os.id = s.order_status_id
    join movies m on m.id = c.movies_id 
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

module.exports = {
  getSeat,
};
