const Flight = require('../models/flight');

module.exports = {
  index,
  show,
  new: newFlight,
  create,
};

async function index(req, res) {
  const flights = await Flight.find({});
  flights.sort(
    (flightA, flightB) => Number(flightA.departs) - Number(flightB.departs)
  );
  flights.forEach((flight, index) => {
    if (Number(flight.departs) < Number(new Date())) {
      flight.departed = true;
    }
  });
  res.render('flights/index', { title: 'All Flights', flights });
}

async function show(req, res) {
  const flight = await Flight.findById(req.params.id);
  flight.destinations.sort(
    (destA, destB) => Number(destA.arrival) - Number(destB.arrival)
  );
  flight.destinations.forEach((dest, index) => {
    if (Number(dest.arrival) < Number(new Date())) {
      dest.departed = true;
    }
  });
  res.render('flights/show', { title: 'Flight Details', flight });
}

function newFlight(req, res) {
  // We'll want to be able to render an
  // errorMsg if the create action fails
  const newFlight = new Flight();
  //const date = new Date();
  const date = newFlight.departs;
  // Format the date for the value attribute of the input
  let departsDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}`;
  departsDate += `-${date.getDate().toString().padStart(2, '0')}T${date
    .toTimeString()
    .slice(0, 5)}`;
  res.render('flights/new', { Title: 'Add Flight', errorMsg: '', departsDate });
}

async function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  //req.body.nowShowing = !!req.body.nowShowing;
  // remove any whitespace at start and end of cast
  //req.body.cast = req.body.cast.trim();
  // split cast into an array if it's not an empty string - using a regular expression as a separator
  //if (req.body.cast) req.body.cast = req.body.cast.split(/\s*,\s*/);
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    await Flight.create(req.body);
    // Always redirect after CUDing data
    // We'll refactor to redirect to the movies index after we implement it
    res.redirect('/flights'); // Update this line
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('flights/new', { errorMsg: err.message });
  }
}
