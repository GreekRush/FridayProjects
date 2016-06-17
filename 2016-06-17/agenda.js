var Agenda = require('agenda');

var mongoConnectionString = require('./config');
var agenda = new Agenda({db: {address: mongoConnectionString}});


var jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : [];

agenda.define('test', function (job, done){
	console.log('test');
	done();
});
agenda.define('carson', function (job, done){
	console.log('carson');
	done();
});
agenda.define('rick', function (job, done){
	console.log('rick');
	done();
});
agenda.define('evan', function (job, done){
	console.log('evan');
	done();
});
agenda.define('cody', function (job, done){
	console.log('Caitlin\'s brother');
	done();
});

if(jobTypes.length) {
	agenda.on('ready', function() {
		agenda.start();
	});
}

module.exports = agenda;