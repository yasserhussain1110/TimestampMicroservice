var express = require('express');
var app = express();

app.get('/test', function(req, res) {
  res.send("hello!");
});

app.listen(8080);