var http = require('http');
var fs = require('fs');
var path = require('path');
 
http.createServer(function (request, response) {
 
	console.log('request starting...');
	 
	var filePath = '.' + request.url;
	console.log('filePath is: >>> : ' + filePath);
	if (filePath == './')
		filePath = './index.html';
		 
	var extname = path.extname(filePath);
	console.log('extname is: >>> : ' + extname);
	var contentType = 'text/plain';
	switch (extname) {
		case '.html':
			contentType = 'text/html';
			break;
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.png':
			contentType = 'image/png';
			break;
		case '.jpeg', 'jpg':
			contentType = 'image/jpeg';
			break;
	}
	 
	path.exists(filePath, function(exists) {
	 
		if (exists) {
			fs.readFile(filePath, function(error, content) {
				if (error) {
					response.writeHead(500);
					response.end();
				}
				else {
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
				}
			});
		}
		else {
			response.writeHead(404);
			response.end();
		}
	});

}).listen(8080);
 
console.log('Server running at http://127.0.0.1:8080/');