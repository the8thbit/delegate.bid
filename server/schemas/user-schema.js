//=============================================================================
//VERY SIMPLE USERNAME AND PASSWORD SCHEMA WITH PASSWORD HASH
//=============================================================================
var mongoose = require('mongoose');
var schema = mongoose.Schema
bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

//create schema model
var userSchema = new schema({
	username:  { type: String, required: true, index: { unique: true } },
	password:  { type: String, required: true  },
	email:     { type: String, required: false },
	creation:  { type: Date,   required: true, default: Date.now },
	lastVisit: { type: Date,   required: true, default: Date.now }
});

//mongoose middleware automatically hashes passsword before saving to mongodb
userSchema.pre('save', function(next) {
	var user = this
	// only hash the password if it has been modified (or is new)
	if (user.isModified('password')) {
		// generate a salt (used to hash prevents brute force attacks)
		bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
			if (err) { return next(err); }
			// hash the password along with our new salt
			bcrypt.hash(user.password, salt, function(err, hash) {
				if (err) { return next(err); }
				// override the cleartext password with the hashed one
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

//password verification
userSchema.methods.comparePassword = function(candidatePassword, hash, cb) {
	bcrypt.compare( candidatePassword, hash, function(err, isMatch) {
		if (err) { return cb(err) };
		cb(null, isMatch);
	});
};

//export this model
module.exports = mongoose.model('user', userSchema);
