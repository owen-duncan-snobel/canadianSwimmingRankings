const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const jsonParser = bodyParser.json();
const axios = require('axios');

/**
 * * Cors and bodyparser middlewear required
 */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(favicon(__dirname + '/build/favicon.ico'));
/**
 * * the __dirname is the current directory from where the script is running
 */
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

/**
 * * GET and POST routes
 */
app.post('/swimmers', jsonParser, async (req, res) => {
	try {
		/**
		 * * Convert the form data into a query params string
		 */
		const params = req.body;
		const qs = Object.keys(params)
			.map((key) => `${key}=${params[key]}`)
			.join('&');

		await axios({
			method: 'GET',
			url: 'http://127.0.0.1:8000/swimmers?' + qs,
		})
			.then((response) => {
				return response.data;
			})
			.then((data) => res.send(data));
	} catch (error) {
		console.log(error);
		res.status(error.response.status).send(error.response.data);
	}
});

app.post('/clubs', jsonParser, async (req, res) => {
	res.send(req.body);
});

app.listen(port);
