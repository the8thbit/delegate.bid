var EXPRESS = require('express');
DELBID = EXPRESS();

DELBID.express   = EXPRESS;
DELBID.config    = require('./config.js');
DELBID.stylus    = require('stylus');
DELBID.db        = require('./server/schemas/mainDB.js');
DELBID.auth      = require('./server/auth.js')(DELBID);

//standard function for handling errors
//just prints the error to the console
//and executes a callback if one is provided
DELBID.handleErr = function(err, cb){
	if (err) { console.log(err); }
	if (cb ) { cb; }
}

//use stylus templates for CSS
DELBID.compile = function(str, path){ return DELBID.stylus(str).set('filename', path); } 
DELBID.use(DELBID.stylus.middleware({
	src:     __dirname + '/',
	compile: DELBID.compile
}));
DELBID.use(DELBID.express.static(__dirname + '/'));

DELBID.routes          = {};
DELBID.routes.auth     = require('./server/routes/auth.js'   )(DELBID);
DELBID.routes.views    = require('./server/routes/views.js'  )(DELBID);
DELBID.routes.queries  = require('./server/routes/queries.js')(DELBID);

//use socket.io and give it a location to listen on 
DELBID.socketio = require('socket.io').listen(DELBID.listen(DELBID.config.SERVER_PORT, DELBID.config.SERVER_IP));
DELBID.socketio.set('log level', 1);
DELBID.socketio.set('browser client minification', true);
DELBID.socketio.set('browser client etag', true);

//use passport.socket.io to link passport sessions with a socket
DELBID.socketio.set('authorization', DELBID.auth.passportSIO.authorize({
	cookieParser: DELBID.express.cookieParser,
	key:          'delegate.bid.sid',
	secret:       DELBID.config.COOKIE_SECRET,
	store:        DELBID.auth.sessionStore.mongo,
	fail:         function(data, message, error, accept){ accept(null, true); }
}));

console.log('All systems are GO!');
console.log('listening at ' + DELBID.config.SERVER_IP + ' on port ' + DELBID.config.SERVER_PORT);

