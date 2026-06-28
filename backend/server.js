const	http = require("http");
const	app = require("./app");
const	port = 3000;
app.set('port', port);

const errorHandler = error => {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const	port = server.address().port;
	switch (error.code) {
		case 'EACCES':
			console.error(port + ' requires privileges.');
	    	process.exit(1);
	    	break;
		case 'EADDRINUSE':
			console.error(port + ' is already in use.');
			process.exit(1);
			break;
	  	default:
	    	throw error;
	}
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  console.log('Listening on ' + server.address().port);
});

server.listen(port);