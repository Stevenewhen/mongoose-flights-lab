var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights')


// Get /flights
router.get('/', flightsCtrl.index)

// GET route to /flights/new
router.get('/new', flightsCtrl.new)

// POST route to /flights/new
router.post('/', flightsCtrl.create)

// Get /flights/id
router.get('/:id', flightsCtrl.show)


module.exports = router;
