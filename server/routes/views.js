module.exports = function(app){
	//use jade templates for HTML
	app.set('views', __dirname + '/../../client');
	app.set('view engine', 'jade');
	app.engine('jade', require('jade').__express);

	//get the JADE template pages used in the project
	app.get('/', function(req, res){ res.render('main/main'); });
}
