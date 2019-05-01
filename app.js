let http = require('http');
http.createServer(function (request, response) {

	response.writeHead(200, {'Content-type' : 'text/plain'});
	response.write("Response's coming from server... \n");
	response.end();
}
).listen(8080);
console.log('listening on port 8080...');