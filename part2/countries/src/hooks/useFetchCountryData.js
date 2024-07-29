import { useEffect, useState } from "react";

import countriesService from "../services/countries";
import weatherService from "../services/weather";

export const useFetchCountryData = (countryName) => {
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    countriesService
      .get(countryName)
      .then((data) => setCountry(data))
      .catch((error) => {
        setError(
          `The following error occured while retrieving country data from the server: '${error}'.`
        );
      });

    return () => controller.abort();
  }, [countryName]);

  useEffect(() => {
    const controller = new AbortController();

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

    return () => controller.abort();
  }, [country]);

  return [country, weather, error];
};
