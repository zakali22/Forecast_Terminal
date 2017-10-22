const http = require('http');
const args = process.argv;

let location = args[2];
let temp = 0;

const output = () => {
  console.log(`${location.charAt(0).toUpperCase() + location.slice(1)} is currently ${temp} degrees celcius`);
};

const loc = (postcode) => {
  const customUrl = `http://api.openweathermap.org/data/2.5/weather?q=${postcode}&APPID=17f62b6dbcccbfc5051fd5af0e7a8c05
`;
  http.get(customUrl, (response) => {
    let fullBody = "";
    response.on('data', (data) => {
      fullBody += data.toString();
    }).on('end', () => {
      const parsed = JSON.parse(fullBody);
      temp += Math.round(parsed.main.temp - 273.15);
      output();
    });
  });
};

loc(location);
