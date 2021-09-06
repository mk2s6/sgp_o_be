const pool = require('../../database/db');
const hf = require('../../model/helper-function');

async function insertOccasions(user) {
  return pool.execute(
    `
        INSERT INTO occasions (
              name, year, month
          )
        VALUES ( ?, ?, ? )
      `,
    [user.name, user.year, user.month],
  );
}

async function getOccasions() {
  return pool.execute(
    `
        SELECT * FROM occasions;
      `,
    [],
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

async function getExpensesSummary(occasion) {
  return pool.execute(
    `
        SELECT
          SUM( paid ) AS spent,
          SUM( amount ) AS expected
        FROM expenses WHERE occasion = ?
         GROUP BY occasion;
      `,
    [occasion],
  );
}

module.exports = {
  insertOccasions,
  getOccasions,
  getDonationsSummary,
  getExpensesSummary,
};
