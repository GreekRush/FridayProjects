var Nightmare = require('nightmare'),
	fs        = require('fs'),
	http      = require('http'),
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
	.goto('http://aerotrak.bandcamp.com/album/at-ease')
	.wait()
	.screenshot(config.screenPath + 'download1.png')
	.click('h4.ft button.download-link')
	.screenshot(config.screenPath + 'download2.png')
	.type('#userPrice', '0')
	.wait(500)
	.screenshot(config.screenPath + 'download3.png')
	.click('#downloadButtons_download button')
	.wait()
	.wait(1000)
	.screenshot(config.screenPath + 'download4.png')
	.evaluate(function (){
		return {
			name: $('.downloadItemTitle').text().trim(),
			href: $('.downloadGo').prop('href').trim()
		};
	})
	.end()
	.then(function (value){
		console.log(value);
		var filename = config.downloads + value.name + '.zip';
		var file = fs.createWriteStream(filename);
		var request = http.get(value.href, function (response){
			response.pipe(file);
		});
	})
	.catch(function (error){
		console.error('Search failed:', error);
	});