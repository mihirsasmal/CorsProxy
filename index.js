var express = require('express');  
var request = require('request');

var app = express();  

app.use('/proxy', function(req, res) {  

    var url = req.url.replace('/?url=','');

  if(req.headers["access-control-request-headers"] != null)
    res.header('Access-Control-Allow-Headers',`${req.headers["access-control-request-headers"]},*`);
  else  
    res.header('Access-Control-Allow-Headers','*');

  res.header('Access-Control-Allow-Origin' ,'*');
  
  if(req.method == 'OPTIONS') res.send();
  else 
    req.pipe(request.get({url:url, rejectUnauthorized: false})).pipe(res);         
});

app.listen(process.env.PORT || 3000);  