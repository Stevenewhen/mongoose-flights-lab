const mongoose = require('mongoose');

const Schema = mongoose.Schema;
	
const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    required: true,
  },
  arrival: {
    type: Date,
    required: true,
  },
})


const flightSchema = new Schema({
  airline: {
    type: String,
    required: true,
    enum: ['American','Southwest', 'United']
  },
  airport: {
    type: String,
    required: true,
    enum: ['AUS', 'DFW', 'DEN', 'LAX','SAN']
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date,
    default: function() {
      const oneYearLater = new Date();
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1)
      return oneYearLater.toISOString().slice(0,16)
    }
  },
  destinations: [destinationSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema)

