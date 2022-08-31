const pool = require('../../database/db');

async function insertExpense({ expenseFor, amount, description = null, paid, occasion }, { id }) {
  return pool.execute(
    `
        INSERT INTO expenses(expenseFor, amount, description, paid, occasion, added_by )
        VALUES ( ?, ?, ?, ?, ?, ? )
      `,
    [expenseFor, amount, description, paid, occasion, id],
  );
}

async function getExpenses(occasion) {
  return pool.execute(
    `
        SELECT * FROM expenses WHERE occasion = ?;
      `,
    [occasion],
  );
}

async function payExpenses(amount, expense) {
  return pool.execute(
    `
        UPDATE expenses SET paid = ? WHERE id = ?;
      `,
    [amount, expense],
  );
}

async function editExpenses({ expenseFor, description, amount, paid, expense, occasion }, { id }) {
  return pool.execute(
    `
        UPDATE expenses SET expenseFor = ?, description = ?, amount = ?, paid = ?, updated_by = ? WHERE id = ? and occasion = ?;
      `,
    [expenseFor, description, amount, paid, id, expense, occasion],
  );
}

async function payFullExpense(expense, occasion) {
  return pool.execute(
    `
        UPDATE expenses SET paid = amount WHERE id = ? AND occasion = ?;
      `,
    [expense, occasion],
  );
}

module.exports = {
  insertExpense,
  getExpenses,
  payExpenses,
  payFullExpense,
  editExpenses,
};
