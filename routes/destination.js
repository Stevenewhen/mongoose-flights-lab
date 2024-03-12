const express = require('express');
const router = express.Router();
const flightsCtrl = require('../controllers/flights');

// Add a new destination for a specific flight
router.post('/:id', flightsCtrl.addDestination);

module.exports = router;
