var express = require('express');

var User = require('./mongo/User');


var fs = require('fs');
var bodyParser = require('body-parser'); //
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

app.post('/create', function(req, res) {
         var newUser = User({
                name: req.body.name,
                content: req.body.content
            });
        
    newUser.save(function(err) {
      if (err) throw err;

       User.find({}, function(err, users) {
  if (err) throw err;
          var str=  JSON.stringify(users);
     res.end(str);
    }); 
    });  
  });



/*read*/
app.get('/read', function(req, res) {
        User.find({}, function(err, users) {
  if (err) throw err;
          var str=  JSON.stringify(users);
     res.end(str);
    }); 
});

/*update*/
app.post('/update/:id', function(req, res) {
    
    User.findOneAndUpdate({_id : req.params.id}, { name : req.body.name, content: req.body.content, updated_at : new Date }, function(err, user) {
  if (err) throw err;
                User.find({}, function(err, users) {
  if (err) throw err;
          var str=  JSON.stringify(users);
     res.end(str);
    }); 
});
});
/*delete*/

app.get('/delete/:id', function(req, res) {
           User.findOneAndRemove({_id : req.params.id}, function(err) {
  if (err) throw err;
 User.find({}, function(err, users) {
  if (err) throw err;
          var str=  JSON.stringify(users);
     res.end(str);
    });
  // we have deleted the user
});
    
});
           
           


app.listen(8081);
console.log("App listening on port 8081");
