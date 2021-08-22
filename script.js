const api = {
    key: "ae656c20f582214fe7488493c5aac00e",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBar = document.querySelector(".searchBar");
searchBar.addEventListener('keypress', setQuery);

function setQuery (evt){
    if (evt.keyCode == 13){
        getResults(searchBar.value);
    }
}
function getResults (query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then (weather => {
        return weather.json();
    })
    .then (displayResults)
}
function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temperature');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`

    let weather_element = document.querySelector('.current .weather');
    weather_element.innerText = weather.weather[0].main;

    let high_low = document.querySelector('.current .high-low');
    high_low.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`
}

function dateBuilder (d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}