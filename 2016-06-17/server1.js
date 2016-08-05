var express = require('express');
var app = express();

var Agenda = require('agenda');
var Agendash = require('agendash');

var mongoConnectionString = require('./config');

var agenda = new Agenda({db: {address: mongoConnectionString},processEvery: '5 seconds'});
var worker = require('./agenda.js');



app.use('/agendash', Agendash(agenda));

app.get('/test', function (req, res) {
	worker.now('test');
	res.send('Hello from A!');
});
app.get('/carson', function (req, res) {
	worker.now('carson');
	res.send('Hello carson!');
});
app.get('/rick', function (req, res) {
	worker.now('rick');
	res.send('Hello rick');
});
app.get('/evan', function (req, res) {
	worker.now('evan');
	res.send('Hello evan!');
});
app.get('/cody', function (req, res) {
	worker.now('cody');
	res.send('Oh hey Cody...!');
});

app.listen(3001, function () {
	console.log('Example app listening on port 3001!');
});