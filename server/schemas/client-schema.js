var mongoose = require('mongoose');
var schema = mongoose.Schema

var clientSchema = new schema({
	ip:        { type: String, required: true, index: { unique: true } },
	creation:  { type: Date,   required: true, default: Date.now },
	lastVisit: { type: Date,   required: true, default: Date.now }
});

module.exports = mongoose.model( 'client', clientSchema );




