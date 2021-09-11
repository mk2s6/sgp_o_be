/* eslint-disable linebreak-style */
const express = require('express');
const adminRoutes = require('./admin/admin');
// const clientRoutes = require('./clients/clients');
const occasionsRoutes = require('./occasions');
const donationsRoutes = require('./donations');
const expensesRoutes = require('./expenses');

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/occasions', occasionsRoutes);
router.use('/donations', donationsRoutes);
router.use('/expenses', expensesRoutes);

module.exports = router;
