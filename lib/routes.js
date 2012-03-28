var mongoLib = require('./mongoLib');
mongoLib.connect('mongodb-1');

module.exports = function routes(app) {
	app.get('/', function(req, res) {
		res.render('index');
	});
	
	app.post('/adduser', function(req, res){
		mongoLib.addUser(req.body, function(err, jsonStr) {
				if(err) {
					console.log(err);
				} else {
					res.end(jsonStr);
				}
			}
		)
	});
	
	app.get('/existingUsers', function(req, res) {
		mongoLib.existingUsers(function(err, result) {
				if(err) {
					console.log(err);
				} else {
					res.end(JSON.stringify(result));
				}
			}
		)
	});
}


