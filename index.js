const mySelect = document.getElementById("mySelect");
const API_KEY = "f033e9d41d88b673eead62fb2a3a2fbe";

async function getCitiesData() {
  const cities = await fetch(
    "https://gist.githubusercontent.com/alex-oleshkevich/6946d85bf075a6049027306538629794/raw/3986e8e1ade2d4e1186f8fee719960de32ac6955/by-cities.json"
  );
  const responce = await cities.json();
  return responce;
}

async function getCitiesArray() {
  const mainData = await getCitiesData();
  const regions = mainData[0].regions;
  const allCities = [];
  const allCitiesNames = [];
  regions.forEach((element) => {
    allCities.push(element.cities);
  });
  allCities.forEach((element) => {
    element.forEach((el) => {
      allCitiesNames.push([el.name, el.lat, el.lng]);
    });
  });
  return allCitiesNames;
}

async function setValues() {
  const cities = await getCitiesArray();
  const selectOption = cities.forEach((element) => {
    let oneCity = document.createElement("option");
    oneCity.value = element[0];
    oneCity.innerHTML = element[0];
    oneCity.dataset.lat = element[1];
    oneCity.dataset.long = element[2];
    mySelect.append(oneCity);
  });
}

setValues();

mySelect.addEventListener("change", () => {
  let options = mySelect.options;
  let selectedIndex = mySelect.selectedIndex;
  getWeather(
    options[selectedIndex].dataset.lat,
    options[selectedIndex].dataset.long
  );
});

async function getWeather(lat, long) {
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f033e9d41d88b673eead62fb2a3a2fbe&units=metric`
  );
  const responce = await weather.json();
  document.getElementById(
    "coords"
  ).innerHTML = `LOG: ${responce.coord.lon}, LAT: ${responce.coord.lat}.`;
  document.getElementById("temp").innerHTML = `TEMP: ${responce.main.temp}.`;
  document.getElementById(
    "wind"
  ).innerHTML = `WIND deg: ${responce.wind.deg}, speed: ${responce.wind.speed}.`;
}
