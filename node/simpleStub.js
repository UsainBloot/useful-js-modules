var express = require('express');
var stub = express();

/* Data */
var sampleData = require('./data/sample-data.json');

/* Setup server */
stub.use(function(req, res, next) {
  /* Enable CORS */
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* Get users */
stub.get('/api/endpoint', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(sampleData));
});

stub.listen(8000, function () {
  console.log('Stub listening on port 8000');
});
