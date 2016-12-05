var path = require('path');
var express = require('express');
var strftime = require('strftime');


var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:date', function(req, res) {
  var inputDate = req.params.date;
  var naturalDate, unixDate;

  if (!isNaN(inputDate)) {
    unixDate = Number(inputDate)*1000;
    naturalDate = strftime('%B %d, %Y', new Date(unixDate));
  } else {
    naturalDate = inputDate;
    unixDate = Date.parse(naturalDate);
    if (isNaN(unixDate)) {
      naturalDate = null;
    }
  }

  res.json({
    unix: unixDate,
    natural: naturalDate
  });
});

app.listen(process.env.PORT || 8080);