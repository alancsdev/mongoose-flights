const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
  create,
  destroy,
};

let flight = null;

module.exports = {
  create,
  destroy,
};

async function create(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);

    // Crie um novo ticket com os detalhes fornecidos no corpo da requisição
    const newTicket = new Ticket({
      name: req.body.name,
      seat: req.body.seat,
      price: req.body.price,
    });

    await newTicket.save();

    flight.tickets.push(newTicket);

    await flight.save();

    res.redirect(`/flights/${flight._id}`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao adicionar ticket ao voo.');
  }
}

async function destroy(req, res) {
  try {
    const flight = await Flight.findByIdAndUpdate(
      req.params.flightId,
      { $pull: { tickets: req.params.ticketId } },
      { new: true }
    );
    await Ticket.findByIdAndDelete(req.params.ticketId);

    res.redirect(`/flights/${flight._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting ticket');
  }
}
