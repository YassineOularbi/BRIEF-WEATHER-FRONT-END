const apiKey = '18002b8e2a0e5dcc0d2aeda8d5c816e7';

async function searchWeather() {
    let villeInput = document.getElementById("search").value.trim();

    if (villeInput !== '') {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${villeInput}&appid=${apiKey}&units=metric&lang=en`)

        const weatherData = await response.json();
        if(weatherData.cod !== '404'){
            Display(weatherData);
        } else {
            alert('City not found! try again.');
        }
    } else {
        alert('Please enter a city name.');
    }
}

function Display(weatherData) {
    console.log(weatherData);
    let image = document.getElementById("icon-weather");
    let bg = document.querySelector(".weather-now");
    let icon = document.getElementById("rainfall-icon")
    let sun = document.getElementById("sun-move")
    document.getElementById('hour-now').textContent = convertirHorodatageUnix(weatherData.dt);
    document.getElementById('city-Name').textContent = weatherData.name;
    document.getElementById('latitude').textContent = 'Latitude : ' + weatherData.coord.lat;
    document.getElementById('longitude').textContent = 'Longitude : ' + weatherData.coord.lon;

    switch (weatherData.weather[0].main) {
        case 'Clear':
            image.src = 'pictures/clear.png';
            bg.style.backgroundImage = 'url("/pictures/bg-light-3.png")';
            break;
        case 'Rain':
            image.src = 'pictures/weather-8.png';
            bg.style.backgroundImage = 'url("/pictures/bg-dark-1.png")';
            break;
        case 'Snow':
            image.src = 'pictures/weather-4.png';
            bg.style.backgroundImage = 'url("/pictures/bg-light-4.png")';
            break;
        case 'Clouds':
            image.src = 'pictures/sun-cloud1.png';
            bg.style.background = 'url("pictures/bg-light-1.png")';
            break;
        case 'Mist':
            image.src = 'pictures/clouds.png';
            bg.style.backgroundImage = 'url("pictures/bg-dark-4.png")';
            break;
    }

    document.getElementById('Sky-state').textContent = weatherData.weather[0].description;
    document.getElementById('temperature').textContent = weatherData.main.temp + ' °C';
    document.getElementById('high-temp').textContent = 'High : ' + weatherData.main.temp_max + ' °C';
    document.getElementById('low-temp').textContent = 'Low : ' + weatherData.main.temp_min + ' °C';
    document.getElementById('wind-speed').textContent = weatherData.wind.speed;
    document.getElementById('wind-speed-sudden').textContent = weatherData.wind.speed;
    if (weatherData && weatherData.rain && weatherData.rain["1h"]) {
        document.getElementById('rainfall').textContent = weatherData.rain["1h"];
        if(weatherData.rain["1h"] < 10){
            document.getElementById('rainfall-state').textContent = 'Low';
        } else if (weatherData.rain["1h"] >= 10 && weatherData.rain["1h"] <= 15){
            document.getElementById('rainfall-state').textContent = 'Medium';
        } else {
            document.getElementById('rainfall-state').textContent = 'High';
        }
        switch(weatherData.weather[0].main){
            case 'Rain' :
                if(weatherData.rain["1h"] <= 10){
                    icon.src = 'icons/rain.png'; 
                }  else {
                    icon.src = 'icons/rain-high.png'; 
                }
                break;
            case 'Snow' :
                if(weatherData.rain["1h"] <= 10){
                    icon.src = 'icons/snow.png'; 
                }  else if(weatherData.rain["1h"] <= 10 && weatherData.rain["1h"] >= 15) {
                    icon.src = 'icons/snow-high.png'; 
                } else {
                    icon.src = 'icons/snow-danger.png'; 
                }
                break;
            default :
            icon.src = 'icons/sun.png'; 
        }
    } else {
        document.getElementById('rainfall').textContent = '0';
        document.getElementById('rainfall-state').textContent = '';
      }
    document.getElementById('humidity').textContent = weatherData.main.humidity+'%';
    document.getElementById('sunrise').textContent = convertirHorodatageUnix(weatherData.sys.sunrise);
    document.getElementById('sunset').textContent = convertirHorodatageUnix(weatherData.sys.sunset);
    if(convertirHorodatageUnix(weatherData.dt) > convertirHorodatageUnix(weatherData.sys.sunrise) && convertirHorodatageUnix(weatherData.dt) < '12:00:00'){
        
    } else if (convertirHorodatageUnix(weatherData.dt) < convertirHorodatageUnix(weatherData.sys.sunset) && convertirHorodatageUnix(weatherData.dt) > '16:00:00') {
       
    } else {
        
    }
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