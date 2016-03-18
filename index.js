var http = require("http");
var fs = require("fs");
var port = process.env.PORT || 8080;

// var data = fs.readFileSync('index.html');

/*serves main page*/
var r_l = function(request, response) {

    fs.open('index.html', 'r', function(err, fd) {
        fs.readFile('index.html', function(err, data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data.toString());
        response.end();
        }); 
    });
}


var server = http.createServer(r_l);
server.listen(port); 