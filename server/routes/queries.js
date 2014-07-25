module.exports = function(app){
	app.get('/mongo/queryName', function (req, res, next) { this.queryName(req, res, next); } );

	this.queryName = function( req, res, next ){

	}

	return this;
}
