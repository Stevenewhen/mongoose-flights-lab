const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
  new: newTicket,
  create: createTicket,
};

function newTicket(req, res) {
  res.render('tickets/new', { flightId: req.params.id });
}


async function createTicket(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    req.body.flight = flight._id;

    console.log('Seat:', req.body.seat);
    console.log('Price:', req.body.price);

    const ticket = await Ticket.create(req.body);
    res.redirect(`/flights/${flight._id}`);
  } catch (err) {
    console.error(err);
    res.redirect('/flights'); 
  }
}
