window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let locationIcon = document.querySelector('.weather-icon');
    let Humidity = document.querySelector('.temperature-humidity');
    let wind = document.querySelector('.temperature-wind');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `http://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=b86fd8f7708187a762619d1377a88ec7`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                    const feels_like = data.main.feels_like;
                    const description = data.weather[0].description;
                    const  name = data.name;
                    const speed = data.wind.speed;
                    const humid = data.main.humidity;
                    const icon = data.weather[0].icon;

                    //Set DOM elements from the API
                    temperatureDegree.textContent = feels_like;
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = name;
                    locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
                    wind.textContent = speed;
                    Humidity.textContent = humid; 
                });
        });
    }
});