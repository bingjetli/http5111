//@ts-nocheck
//Start Time : 3:29 PM, Estimated End Time : 4:29 PM
//Actual End Time 4:08PM: 

const la_cle_de_api = 'e72c18ed5b9d0bf5ddcfa446ee624b34';

window.onload = async _ => {
  //Setup Button Event Listener for Toronto
  document.getElementById('Toronto').onclick = async _ => {
    try {
      const les_donnees_des_temps = await getCurrentWeatherForCity({
        city_name: 'Toronto',
        country_code: 'CA',
        units: 'metric',
      });

      showWeatherForCity(les_donnees_des_temps);
    }
    catch (error) {
      document.getElementById('output').innerHTML = `<p>${error}</p>`;
      document.getElementById('output').style.display = 'block';
    }
  };

  //Setup Button Event Listener for Belize
  document.getElementById('Belize').onclick = async _ => {
    try {
      const les_donnees_des_temps = await getCurrentWeatherForCity({
        city_name: 'Belize',
        country_code: 'BZ',
        units: 'metric',
      });

      showWeatherForCity(les_donnees_des_temps);
    }
    catch (error) {
      document.getElementById('output').innerHTML = `<p>${error}</p>`;
      document.getElementById('output').style.display = 'block';
    }
  };
};



function showWeatherForCity(weather_data) {
  //Get DOM element handles.
  const l_emplacement = document.getElementById('location');
  const l_icone = document.getElementById('icon');
  const la_temperature = document.getElementById('temperature');
  const l_etat = document.getElementById('conditions');
  const le_vent = document.getElementById('wind');

  //Inject CSS to the output section
  l_etat.style.textTransform = 'Capitalize';
  const le_style_de_la_image = 'height: 3em; width: 3em;';

  //Output the weather data.
  l_emplacement.innerText = weather_data.name;
  l_icone.innerHTML = `<img src="${buildWeatherIconURL(weather_data.weather[0].icon)}" alt="weather_icon" style="${le_style_de_la_image}">`;
  la_temperature.innerText = Math.round(weather_data.main.temp) + '°C';
  l_etat.innerText = weather_data.weather[0].description;
  le_vent.innerText = weather_data.wind.speed + 'm/s @ ' + weather_data.wind.deg + '°';

  document.getElementById('output').style.display = 'block';
}



function buildWeatherIconURL(icon_code) {
  return `https://openweathermap.org/img/wn/${icon_code}@2x.png`;
}



async function getCurrentWeatherForCity({
  city_name,
  country_code,
  state_code,
  units
}) {
  try {
    const les_coordonnees = await getLocationCoordinates({
      city_name: city_name,
      state_code: state_code,
      country_code: country_code,
      api_key: la_cle_de_api,
      limit: 1,
    });

    return await getCurrentWeather({
      api_key: la_cle_de_api,
      units: units,
      lat: les_coordonnees[0].lat,
      lon: les_coordonnees[0].lon,
    });
  }
  catch (error) {
    //Pass the error back to the calling function.
    throw error;
  }
}



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