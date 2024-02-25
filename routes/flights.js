const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const flightsController = require('../controllers/flights');

// GET /flights
router.get('/', flightsController.index);
// GET /flights/new
router.get('/new', flightsController.new);
// POST /flights
router.post('/', flightsController.create);

module.exports = router;
