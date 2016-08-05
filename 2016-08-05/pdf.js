var Nightmare = require('nightmare'),
	fs        = require('fs'),
	http      = require('http'),
	moment	= require('moment'),
	nightmare = Nightmare({
							  show: false
						  });

var config = {
	screenPath: './screen-shots/',
	pdf      : './pdfs/',
	downloads : './downloads/'
};

var google = nightmare
	.viewport(1000, 1000)
	.useragent(
		"Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
	.goto('http://cube-drone.com/comics/')
	.wait()
	.pdf(config.pdf+'cube-drone'+moment().format('_MM_DD_YYYY')+'.pdf')
	.end()
	.then(function (value){
		console.log('DONE SAVING COMICS');
	})
	.catch(function (error){
		console.error('Search failed:', error);
	});