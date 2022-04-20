const express = require('express');
const request = require('request');
const { response } = require('express');

const app = express();

const apiKey = '';

app.use(express.static('public'));

app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null });
});

app.post('/', (req, res) => {
    const city = req.body.city;

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, (error, response, body) => {
        if (error) {
            res.render('index', { weather: null, error: 'Error, no response' });
        } else {
            const weather = JSON.parse(body);

            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, no response' });
            } else {
                const weatherText = `Temp: ${weather.main.temp} degrees, ${weather.weather[0].main} in ${weather.name}`;

                res.render('index', { weather: weatherText, error: null });
            }
        }
    });
});

app.listen(8080, () => {
    console.log('Server running');
});
