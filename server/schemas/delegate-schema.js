var mongoose = require('mongoose');
var schema = mongoose.Schema;

var delegateSchema = new schema({
	account:  { type: String,  required: true, index: { unique: true } },
	creation: { type: Date,    required: true, default: Date.now }
});

module.exports = mongoose.model('delegate', delegateSchema);
