function searchCountry() {
    const searchInput = document.getElementById('searchInput').value;
    if (searchInput.trim() !== '') {
        const imageContainer = document.getElementById('image-container');
        imageContainer.innerHTML = '';
        fetchDataAndDisplay(searchInput);
    } else {
        alert('Please enter a search query.');
    }
}

async function fetchDataAndDisplay(countryName) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        displayCountryData(data);
    } catch (error) {
        console.error('Error fetching country data:', error);
    }
}

function displayCountryData(countryData) {
    const countryDataContainer = document.getElementById('countryData');
    countryDataContainer.innerHTML = '';

    countryData.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');

        // Create div for flag
        const flagDiv = document.createElement('div');
        flagDiv.classList.add('flag');

        const flag = document.createElement('img');
        flag.src = country.flags.svg;
        flag.alt = `${country.name.common} flag`;

        flagDiv.appendChild(flag);
        countryCard.appendChild(flagDiv);

        // Create div for text
        const textDiv = document.createElement('div');
        textDiv.classList.add('text');

        const name = document.createElement('h2');
        name.textContent = country.name.common;
        name.classList.add('country-name');

        const population = document.createElement('p');
        population.textContent = `Population: ${country.population}`;
         population.classList.add('country-detail');

        const capital = document.createElement('p');
        capital.textContent = `Capital: ${country.capital}`;
        capital.classList.add('country-detail');

        const area = document.createElement('p');
        area.textContent = `Area: ${country.area} sq. km`;
        area.classList.add('country-detail'); 

        const moreDetailsBtn = document.createElement('button');
        moreDetailsBtn.textContent = 'More Details';
        moreDetailsBtn.classList.add('more-details-btn'); 
        moreDetailsBtn.addEventListener('click', () => {
            getWeatherData(country.name.common);
        });

        countryCard.appendChild(name);
        countryCard.appendChild(capital);
        countryCard.appendChild(population);
        countryCard.appendChild(area);
        countryCard.appendChild(moreDetailsBtn);
        countryCard.appendChild(textDiv);
        countryDataContainer.appendChild(countryCard);
    });
}

function getWeatherData(countryName) {
    const weatherDetailsContainer = document.getElementById('weatherDetails');
    weatherDetailsContainer.innerHTML = '';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=6681b5cc6e560c7b4aef43fc5f036bd4&units=metric`)
        .then(response => response.json())
        .then(data => {
            const maxTemp = document.createElement('p');
            maxTemp.textContent = `Max Temperature: ${data.main.temp_max}°C`;

            const minTemp = document.createElement('p');
            minTemp.textContent = `Min Temperature: ${data.main.temp_min}°C`;

            const dayType = document.createElement('p');
            dayType.textContent = `Weather: ${data.weather[0].description}`;

            const windSpeed = document.createElement('p');
            windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

            const humidity = document.createElement('p');
            humidity.textContent = `Humidity: ${data.main.humidity}%`;

            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            const weatherIcon = document.createElement('img');
            weatherIcon.src = iconUrl;
            weatherIcon.alt = data.weather[0].description;

            weatherIconContainer.appendChild(weatherIcon);
 

            weatherDetailsContainer.appendChild(maxTemp);
            weatherDetailsContainer.appendChild(minTemp);
            weatherDetailsContainer.appendChild(dayType);
            weatherDetailsContainer.appendChild(windSpeed);
            weatherDetailsContainer.appendChild(humidity);

            changeBackground(data.weather[0].main);

        })
        .catch(error => console.error('Error fetching weather data:', error));
}
function changeBackground(weatherCondition) {
    const body = document.querySelector('body');
    switch (weatherCondition) {
        case 'Clear':
            body.style.backgroundImage = 'url("image/clear-sky.jpg")';
            break;
        case 'Clouds':
            body.style.backgroundImage = 'url("image/cloudy.jpg")';
            break;
        case 'Rain':
            body.style.backgroundImage = 'url("image/rainy.jpg")';
            break;
        case 'Thunderstorm':
            body.style.backgroundImage = 'url("image/thunderstorm.jpg")';
            break;
        default:
            body.style.backgroundImage = 'url("image/default.jpg")';
            break;
    }
}

