var express = require('express');  
var request = require('request');

var app = express();  
var x=1;

app.use('/proxy', function(req, res) {  
    
    console.log("printing req url"+ x++ );
    console.log(req.url);

    var url = req.url.replace('/?url=','');
    
    console.log("printingurl "+ x );
  console.log(url);
  console.log("printing req header "+ x );
  console.log(req.headers);

  res.header('Access-Control-Allow-Origin' ,'*');
  res.header('Access-Control-Allow-Headers','*');

  req.pipe(
      request.get({url:url, rejectUnauthorized: false}, function (error, response, body)
             {
              console.log('error:', error);
              console.log('statusCode:',response.statusCode);
              res.send(body);
             })
         );
});

app.listen(process.env.PORT || 3000);  