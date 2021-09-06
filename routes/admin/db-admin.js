const pool = require('../../database/db');
const hf = require('../../model/helper-function');

async function validateUsername(userName) {
  return pool.execute('SELECT count(username) AS isAvailable FROM user WHERE username = ?', [userName]);
}

async function getLoginDetails(userName) {
  const beUsername = userName;

  let strUserSelectQuery = `SELECT id AS id, name AS name,
                                     password AS password
                              FROM users`;

  if (hf.isEmail(beUsername)) {
    strUserSelectQuery += ' WHERE email = ?';
  } else if (hf.isMobile(beUsername)) {
    strUserSelectQuery += ' WHERE mobile = ?';
  } else {
    strUserSelectQuery += ' WHERE name = ?';
  }

  return pool.execute(strUserSelectQuery, [beUsername]);
}

async function insertMK2SLLCUsers(user) {
  return pool.execute(
    `
        INSERT INTO admin (
              name, email, phone, password
          )
        VALUES ( ?, ?, ?, ? )
      `,
    [
      user.username,
      user.email,
      user.phone,
      user.beHashedPassword,
      user.name,
      user.gender,
      user.dob,
      user.role,
      user.doj,
      user.address,
      user.city,
      user.state,
      user.country,
      user.pincode,
    ],
  );
}

module.exports = {
  validateUsername,
  getLoginDetails,
  insertMK2SLLCUsers,
};
