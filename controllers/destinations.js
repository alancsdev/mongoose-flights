const Flight = require('../models/flight');
let flight = null;

module.exports = {
  create,
  destroy,
};

async function create(req, res) {
  flight = await Flight.findById(req.params.id);

  //const flight = req.params.id;

  flight.destinations.push(req.body);
  try {
    await flight.save();
  } catch (err) {
    console.log(err);
  }
  // Step 5:  Respond to the Request (redirect if data has been changed)
  res.redirect(`/flights/${flight._id}`);
}

async function destroy(req, res) {
  try {
    await Flight.findOneAndUpdate(
      { 'destinations._id': req.params.id },
      { $pull: { destinations: { _id: req.params.id } } },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/flights/${flight._id}`);
}
