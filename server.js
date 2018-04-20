const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var log = `${new Date().toString()}: ${req.method} ${req.url}`;
	fs.appendFile('server.log', log + '\n', e => {
		if (e) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

app.use((req, res) => {
	res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	// res.send('<h1>Hello Express</h1>');
	res.render('home.hbs', {
		pageTitle: 'Home',
		welcomeMessage: 'Welcome!',
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/bad', (req, res) => {
	res.send({
		error: 404,
	});
});

app.listen(3000, () => {
	console.log('Server is up at port 3000');
});
