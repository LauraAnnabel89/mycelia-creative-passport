var express = require('express'); 
var request = require('request'); 
var app = express();

app.get('/users', function(req, res){ 
    request(`https://search-creativepassportmapsearch-xbszbelehmj4dl2w6prc2vt7mu.eu-west-1.cloudsearch.amazonaws.com/2013-01-01/search`, function (error, response, body) { 
      if (!error && response.statusCode === 200) { 
        console.log(body); 
        res.send(body); 
      } 
     }); 
  });

  app.listen(3005); 
console.log('Server running on port %d', 3005);


