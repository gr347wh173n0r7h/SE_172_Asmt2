var express = require('express');
var app = express();
var fs = require("fs");

// Asynchronous read
// fs.readFile('index.html', function (err, data) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("Asynchronous read: " + data.toString());
// });

// Synchronous read
// var data = fs.readFileSync('index.html');
// console.log("Synchronous read: " + data.toString());

/* serves all the static files*/
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

/*serves main page*/
app.get('/', function(request, response) {
// response.sendfile('index.html')
    fs.readFile('index.html', function(err, data){
        response.send(data.toString());
    }); 
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
