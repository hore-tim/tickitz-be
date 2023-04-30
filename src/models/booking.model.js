const db = require("../configs/supabase");

const getBooking = (email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "select otp from users where email = $1";
    db.query(sqlQuery, [email], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  getBooking,
};
