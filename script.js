const apiKey = '517bee7165f36c269ad0336a4dcf4065';
const city = 'khenifra';
let weatherdt ={};
let weatherdtSearch ={};

    async function weatherData() {
      let weatherData;

      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`)

      weatherData = await res.json();
        if(weatherData){
        weatherdt = weatherData;
        }

    }

weatherData();
setTimeout(function(){
console.log(weatherdt)

document.getElementById('city-Name').textContent = weatherdt.name;
document.getElementById('latitude').textContent = 'Latitude : ' +weatherdt.coord.lat;
document.getElementById('longitude').textContent = 'Longitude : ' +weatherdt.coord.lat;
document.getElementById('temperature').textContent = weatherdt.main.temp+ ' °C';
document.getElementById('high-temp').textContent = ' High : ' +weatherdt.main.temp_max+ ' °C';
document.getElementById('low-temp').textContent = ' Low : ' +weatherdt.main.temp_min+ ' °C';


},1000)

/*const key = "244155d43b7fc901f0f438ae76092427";

async function searchWeather() {
    let villeInput = 'khenifra';

    if (villeInput !== '') {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${villeInput}&limit=5&appid=${key}`);
        const data = await response.json();

        if (data.length > 0) {
            const { lat, lon } = data[0];
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();

            console.log(weatherData);
        } else {
            alert('City not found.');
        }
    } else {
        alert('Please enter a city name.');
    }
}
*/