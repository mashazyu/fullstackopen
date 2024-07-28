import { useEffect, useState } from "react";

import countriesService from "../services/countries";
import weatherService from "../services/weather";

const Country = ({ countryName }) => {
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    countriesService
      .get(countryName)
      .then((data) => setCountry(data))
      .catch((error) => {
        setError(
          `The following error occured while retrieving country data from the server: '${error}'.`
        );
      });
  }, [countryName]);

  useEffect(() => {
    if (country) {
      weatherService
        .get({ lat: country?.latlng[0], lon: country?.latlng[1] })
        .then((data) => setWeather(data))
        .catch((error) => {
          setError(
            `The following error occured while retrieving weather data from the server: '${error}'.`
          );
        });
    }
  }, [country]);

  if (!country) return null;
  if (error) return <>{error}</>;

  const { area, capital, flags, languages, name } = country;
  const capitalName = capital[0];

  return (
    <>
      <h1>{name.official}</h1>
      <div>capital {capitalName}</div>
      <div>area {area}</div>
      <h2>languages</h2>
      <ul>
        {Object.keys(languages).map((key) => (
          <li key={languages[key]}>{languages[key]}</li>
        ))}
      </ul>
      <img src={flags.png} alt={flags.alt} />
      <h2>weather in {capitalName}</h2>
      <div>temperature {weather.main.temp} Celcius</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt={weather.weather[0].main}
      />
      <div>wind {weather.wind.speed} m/s</div>
    </>
  );
};

export default Country;
