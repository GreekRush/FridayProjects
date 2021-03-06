var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');

var port = 3000;

var serve = serveStatic('.', {'index': ['index.html', 'index.htm']});

// Create server
var server = http.createServer(function(req, res){
	serve(req, res, finalhandler(req, res));
});

// Listen
server.listen(port, function(){
	console.log('localhost:' + port);
});
