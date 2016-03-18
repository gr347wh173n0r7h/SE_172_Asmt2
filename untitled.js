var http = require("http");
var fs = require("fs");
var port = process.env.PORT || 8080;

// var data = fs.readFileSync('index.html');

/*serves main page*/
var r_l = function(request, response) {

	fs.open('index.html', 'r', function(err, fd) {
    fs.fstat(fd, function(err, stats) {
        var bufferSize=stats.size,
            chunkSize=512,
            buffer=new Buffer(bufferSize),
            bytesRead = 0;

        while (bytesRead < bufferSize) {
            if ((bytesRead + chunkSize) > bufferSize) {
                chunkSize = (bufferSize - bytesRead);
            }
            fs.read(fd, buffer, bytesRead, chunkSize, bytesRead);
            bytesRead += chunkSize;
        }
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(buffer.toString('utf8', 0, bufferSize));
        response.end();
        fs.close(fd);
    });
});

}

var server = http.createServer(r_l);
server.listen(port); 