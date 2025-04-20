const express = require('express');

const router = express.Router();

const { getAllReports, submitReport, getDashboardData } = require('../controllers/report')

router.post('/report', submitReport);
router.get('/reports', getAllReports);
router.get('/dashboard/:month', getDashboardData);

module.exports = router;