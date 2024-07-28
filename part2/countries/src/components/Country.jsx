import Weather from "./Weather";

import { useFetchCountryData } from "../hooks/useFetchCountryData";

const Country = ({ countryName }) => {
  const [country, weather, error] = useFetchCountryData(countryName);

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
      {weather && (
        <>
          <h2>weather in {capitalName}</h2>
          <Weather weather={weather} />
        </>
      )}
    </>
  );
};

export default Country;
