const Flight = require('../models/flights')


module.exports = {
    new: newFlight,
    create,
    index,
    show,
    addFlight,
    addDestination
};



//Add Destination in Show
async function addDestination(req, res) {
    try {
        const flight = await Flight.findById(req.params.id);
        const newDestination = {
            airport: req.body.airport,
            arrival: req.body.arrival
        };
        flight.destinations.push(newDestination);
        await flight.save();
        res.redirect(`/flights/${flight._id}`);
    } catch (err) {
        console.error(err);
        res.redirect('/error'); 
    }
}

async function show(req,res) {
    const flight = await Flight.findById(req.params.id)
    res.render('flights/show', {
        airline: 'Airline Detail',
        flight
    })
}

async function index(req, res) {
    const flights = await Flight.find({})
    res.render('flights/index', { 
        airline: 'All Flights',
        flights
     })
}

//added arrivalDate needned to do an if function in order to check array for destination
function addFlight(req, res) {
    const newFlight = new Flight();
    const dt = newFlight.departs;
    let departsDate = '';
    let arrivalDate = '';

    if (newFlight.destinations.length > 0) {
        const at = newFlight.destinations[0].arrival;
        departsDate = dt.toISOString().slice(0, 16);
        arrivalDate = at.toISOString().slice(0, 16);
    }

    res.render('flights/new', {
        departsDate,
        arrivalDate,
        errorMsg: ''
    });
}

function newFlight(req,res) {
    const newFlight = new Flight();
    console.log(newFlight)
    const dt = newFlight.departs;
    const departsDate = dt.toISOString().slice(0,16)
    const arrivalDate = ''
    res.render('flights/new', {
        arrivalDate,
        departsDate,
        errorMsg:''
    });
    }

async function create(req, res) {
    console.log(req.body)
    try {
        await Flight.create(req.body)
        res.redirect('flights')
    } catch (err) {
        console.log(err)
        res.render('flights/new', {
            errorMsg: err
        })
    }
}

