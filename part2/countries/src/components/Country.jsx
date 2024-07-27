import { useEffect, useState } from "react";

import countriesService from "../services/countries";

const Country = ({ countryName }) => {
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    countriesService
      .get(countryName)
      .then((data) => setCountry(data))
      .catch((error) => {
        setError(
          `The following error occured while retrieving data from the server: '${error}'.`
        );
      });
  }, [countryName]);

  if (!country) return null;
  if (error) return <>{error}</>;

  const { area, capital, flags, languages, name } = country;

  return (
    <>
      <h1>{name.official}</h1>
      <div>capital {capital.map((capitalName) => capitalName)}</div>
      <div>area {area}</div>
      <h2>languages</h2>
      <ul>
        {Object.keys(languages).map((key) => (
          <li key={languages[key]}>{languages[key]}</li>
        ))}
      </ul>
      <img src={flags.png} alt={flags.alt} />
    </>
  );
};

export default Country;
