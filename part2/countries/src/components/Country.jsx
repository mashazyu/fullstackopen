import CountryData from "./CountryData";
import Weather from "./Weather";

import { useFetchCountryData } from "../hooks/useFetchCountryData";

const Country = ({ countryName }) => {
  const [country, weather, error] = useFetchCountryData(countryName);

  if (!country) return null;
  if (error) return <>{error}</>;

  return (
    <>
      {country && <CountryData country={country} />}
      {weather && (
        <>
          <h2>weather in {country.capital[0]}</h2>
          <Weather weather={weather} />
        </>
      )}
    </>
  );
};

export default Country;
