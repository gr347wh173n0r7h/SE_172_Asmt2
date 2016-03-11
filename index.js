var express = require('express');
var app = express();
var fs = require("fs");

// var data = fs.readFileSync('index.html');


/* serves all the static files*/
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

/*serves main page*/
app.get('/', function(request, response) {

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
        response.send(buffer.toString('utf8', 0, bufferSize));
        fs.close(fd);
    });
});

});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})