var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('app'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile("index.html");
});

/*create*/
app.post('/create', function(req, res) {
  fs.readFile(__dirname + "/app/" + "notes.json", function(err, data) {
    data = JSON.parse(data);
    var key = data.length ? data.slice(-1).pop().id + 1 : 0;
    var d = new Date();
    data.push(req.body);
    data.slice(-1).pop().last_modified = d.getTime();
    data.slice(-1).pop().id = key;
    fs.writeFile(__dirname + "/app/" + "notes.json", JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});

/*read*/
app.get('/read', function(req, res) {
  fs.readFile(__dirname + "/app/" + "notes.json", function(err, data) {
    res.end(data);
  });
});

/*update*/
app.post('/update/:id', function(req, res) {
  fs.readFile(__dirname + "/app/" + "notes.json", function(err, data) {
    data = JSON.parse(data);
    data.forEach(function(note, key) {
      if (note.id === parseInt(req.params.id)) {
        var d = new Date();
        data[key] = req.body;
        data[key].last_modified = d.getTime();
        fs.writeFile(__dirname + "/app/" + "notes.json", JSON.stringify(data));
        res.end(JSON.stringify(data));
      }
    });
    fs.writeFile(__dirname + "/app/" + "notes.json", JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});

/*delete*/
app.get('/delete/:id', function(req, res) {
  fs.readFile(__dirname + "/app/" + "notes.json", function(err, data) {
    data = JSON.parse(data);
    data.forEach(function(note, key) {
      if (note.id === parseInt(req.params.id)) {
        data.splice(key, 1);
        fs.writeFile(__dirname + "/app/" + "notes.json", JSON.stringify(data));
        res.end(JSON.stringify(data));
      }
    });
  });
});

app.listen(8081);
console.log("App listening on port 8081");
