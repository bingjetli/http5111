//@ts-nocheck
const la_cle_de_api = 'e72c18ed5b9d0bf5ddcfa446ee624b34';

window.onload = async () => {
  const les_coordonnees = await getLocationCoordinates({
    city_name: 'Toronto',
    country_code: 'CA',
    api_key: la_cle_de_api,
    limit: 1,
  });

  const les_donnees_du_temps = await getCurrentWeather({
    lat: les_coordonnees[0].lat,
    lon: les_coordonnees[0].lon,
    units: 'metric',
    api_key: la_cle_de_api,
  });

  //Output the API Data.
  document.getElementById('location').innerText = les_donnees_du_temps.name;
  document.getElementById('temperature').innerHTML = Math.round(les_donnees_du_temps.main.temp) + '&deg;C';
  const le_etat = document.getElementById('conditions');
  le_etat.innerText = les_donnees_du_temps.weather[0].description + '.';
  le_etat.style.textTransform = 'Capitalize';

};



// Returns : [{name, local_names, lat, lon, country, state}]
function getLocationCoordinates({ city_name, state_code, country_code, limit, api_key }) {
  //Build the API Request to OpenWeather's Geolocation API.
  const la_requete = country_code === 'US' ?
    [city_name, state_code, country_code].join(',') :
    [city_name, country_code].join(',');
  const la_url = `http://api.openweathermap.org/geo/1.0/direct?q=${la_requete}&limit=${limit}&appid=${api_key}`;

  //Build the XHR Request to the endpoint.
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', la_url);
    xhr.responseType = 'json';
    xhr.send();

    xhr.onload = _ => {
      resolve(xhr.response);
    };

    xhr.onerror = _ => {
      reject(new Error('Failed to make the XHR Request.'));
    };
  });
}



function getCurrentWeather({ lat, lon, units, lang, api_key }) {
  //Build the API Request to OpenWeather's Current Weather Data API.
  let la_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;

  //Append optional query parameters
  if (units !== undefined) {
    la_url += '&units=' + units;
  }

  //Build the XHR Request to the endpoint.
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', la_url);
    xhr.responseType = 'json';
    xhr.send();

    xhr.onload = _ => {
      resolve(xhr.response);
    };

    xhr.onerror = _ => {
      reject(new Error('Failed to make the XHR Request.'));
    };
  });
}