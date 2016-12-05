var path = require('path');
var express = require('express');
var strftime = require('strftime');


var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:date', function(req, res) {
  var inputDate = req.params.date;
  var naturalDate, unixDate;

  if (!isNaN(inputDate)) {  // If input date is a number
    unixDate = Number(inputDate);
    naturalDate = strftime('%B %d, %Y', new Date(unixDate * 1000));
  } else {
    naturalDate = inputDate;
    unixDate = Date.parse(naturalDate) / 1000;
    if (isNaN(unixDate)) {
      unixDate = naturalDate = null;
    }
  }

  res.json({
    unix: unixDate,
    natural: naturalDate
  });
});

app.listen(process.env.PORT || 8080);