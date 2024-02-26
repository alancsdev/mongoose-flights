const express = require('express');
const router = express.Router();
const destinationsController = require('../controllers/destinations');

// POST /flights/:id/destionations (create destionations for a flight)
router.post('/flights/:id/destinations', destinationsController.create);

router.post('/flights/:id/destinations/:id', destinationsController.destroy);

module.exports = router;
