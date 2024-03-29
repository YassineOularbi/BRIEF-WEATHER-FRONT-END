const apiKey = '18002b8e2a0e5dcc0d2aeda8d5c816e7';

async function searchWeather() {
    let villeInput = document.getElementById("search").value.trim();

    if (villeInput !== '') {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${villeInput}&appid=${apiKey}&units=metric&lang=en`)

        const weatherData = await response.json();
        Display(weatherData);

    } else {
        alert('Please enter a city name.');
    }
}

   function Display(weatherdt){
    document.getElementById('city-Name').textContent = weatherdt.name;
    document.getElementById('latitude').textContent = 'Latitude : ' +weatherdt.coord.lat;
    document.getElementById('longitude').textContent = 'Longitude : ' +weatherdt.coord.lon;
    document.getElementById('temperature').textContent = weatherdt.main.temp+ ' °C';
    document.getElementById('high-temp').textContent = ' High : ' +weatherdt.main.temp_max+ ' °C';
    document.getElementById('low-temp').textContent = ' Low : ' +weatherdt.main.temp_min+ ' °C';
    document.getElementById('wind-speed').textContent = weatherdt.wind.speed;
    document.getElementById('wind-speed-sudden').textContent = weatherdt.wind.speed;
    document.getElementById('rainfall').textContent = weatherdt.rain["1h"];
    document.getElementById('humidity').textContent = weatherdt.main.humidity+'%';
    document.getElementById('sunrise').textContent = convertirHorodatageUnix(weatherdt.sys.sunrise);
    document.getElementById('sunset').textContent = convertirHorodatageUnix(weatherdt.sys.sunset);
    
    }


    function convertirHorodatageUnix(heureUnix) {
    
        const milliseconds = heureUnix * 1000;
    
        
        const dateUTC = new Date(milliseconds);
    
        const dateLocale = new Date(dateUTC.getTime());
    
     
        const heure = ('0' + dateLocale.getHours()).slice(-2);
        const minutes = ('0' + dateLocale.getMinutes()).slice(-2);
        const secondes = ('0' + dateLocale.getSeconds()).slice(-2);
    
        return heure + ':' + minutes + ':' + secondes;
    }