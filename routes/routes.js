/* eslint-disable linebreak-style */
const express = require('express');
const adminRoutes = require('./admin/admin.js');
// const clientRoutes = require('./clients/clients');
const occasionsRoutes = require('./occasions');
const donationsRoutes = require('./donations');

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/occasions', occasionsRoutes);
router.use('/donations', donationsRoutes);

module.exports = router;
