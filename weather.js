const http = require('http');
const https = require('https');
const api = require('./api.json');
const args = process.argv;

let location = args[2];
let countryCode = '';
let temp = 0;

const output = () => {
  console.log(`${location.charAt(0).toUpperCase() + location.slice(1)}, ${countryCode.toUpperCase()} is currently ${temp} degrees celcius`);
};

const loc = (postcode) => {
  const customUrl = `http://api.openweathermap.org/data/2.5/weather?q=${postcode}&APPID=${api.key}`;
  http.get(customUrl, (response) => {
    let fullBody = "";
    response.on('data', (data) => {
      fullBody += data.toString();
    }).on('end', () => {
      const parsed = JSON.parse(fullBody);
      countryCode += parsed.sys.country
      temp += Math.round(parsed.main.temp - 273.15);
      output();
    });
  });
};

module.exports = loc;
