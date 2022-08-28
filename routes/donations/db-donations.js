const pool = require('../../database/db');
const hf = require('../../model/helper-function');

async function insertDonation({ name, type, amount, sponsored_item = '', occasion }, { id }) {
  return pool.execute(
    `
        INSERT INTO donations (
              name, type, amount, sponsored_item, received, occasion, added_by
          )
        VALUES ( ?, ?, ?, ?, ?, ?, ? )
      `,
    [name, type, amount, sponsored_item, 0, occasion, id],
  );
}

async function getDonations(occasion) {
  return pool.execute(
    `
        SELECT * FROM donations WHERE occasion = ?;
      `,
    [occasion],
  );
}

async function getDonationsSummary(occasion) {
  return pool.execute(
    `
        SELECT
          SUM( CASE WHEN received = 1 THEN amount ELSE 0 END ) AS collected,
          SUM( amount ) AS expected
        FROM donations WHERE occasion = ?
        GROUP BY occasion;
      `,
    [occasion],
  );
}

async function receiveDonation(donation) {
  return pool.execute(
    `
        UPDATE donations SET received = 1 WHERE id = ?;
      `,
    [donation],
  );
}

async function editDonation({ name, type, amount, sponsored_item = '', occasion, donation }, { id }) {
  return pool.execute(
    `
        UPDATE donations SET
              name = ?, type = ?, amount = ?, sponsored_item = ?, received = ?, updated_by = ?
        WHERE occasion = ? AND id = ?
          
      `,
    [name, type, amount, sponsored_item, 0, id, occasion, donation],
  );
}

module.exports = {
  insertDonation,
  getDonations,
  getDonationsSummary,
  receiveDonation,
  editDonation,
};
