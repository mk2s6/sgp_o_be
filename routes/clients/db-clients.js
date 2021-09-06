const pool = require('../../database/db');
const hf = require('../../model/helper-function');

async function insertMK2SLLCClients(user) {
  return pool.execute(
    `
        INSERT INTO client (
              rest_username, rest_email, rest_phone, rest_password, rest_name,
              rest_gender, rest_dob, rest_role, rest_doj, rest_address, rest_city,
              rest_state, rest_country, rest_zip_code
          )
        VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
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

async function validateUsername(userName) {
  return pool.execute('SELECT count(rest_username) AS isAvailable FROM restaurant WHERE rest_username = ?', [userName]);
}

async function getLoginDetails(userName) {
  const beUsername = userName;

  let strUserSelectQuery = `SELECT rest_id AS id, rest_name AS name,
                                     rest_password AS password, rest_role as role
                              FROM restaurant`;

  if (hf.isEmail(beUsername)) {
    strUserSelectQuery += ' WHERE rest_email = ?';
  } else if (hf.isMobile(beUsername)) {
    strUserSelectQuery += ' WHERE rest_phone = ?';
  } else {
    strUserSelectQuery += ' WHERE rest_username = ?';
  }

  // Only allow non deleted employee
  strUserSelectQuery += ' AND rest_active = ?';

  return pool.execute(strUserSelectQuery, [beUsername, 1]);
}

async function insertMK2SLLCUsers(user) {
  return pool.execute(
    `
        INSERT INTO restaurant (
              rest_username, rest_email, rest_phone, rest_password, rest_name,
              rest_gender, rest_dob, rest_role, rest_doj, rest_address, rest_city,
              rest_state, rest_country, rest_zip_code
          )
        VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
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
  insertMK2SLLCClients,
  insertMK2SLLCUsers,
};
