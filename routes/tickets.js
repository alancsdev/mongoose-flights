const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/tickets');

router.post('/flights/:id/tickets', ticketsController.create);

router.post('/flights/:flightId/tickets/:ticketId', ticketsController.destroy);

module.exports = router;
