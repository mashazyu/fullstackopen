import { useEffect, useState } from "react";

import countriesService from "../services/countries";

export const useFetchCountries = (filter) => {
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    countriesService
      .getAll()
      .then((initialData) => setCountries(initialData))
      .catch((error) => {
        setError(
          `The following error occured while retrieving data from the server: '${error}'.`
        );
      });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries?.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLocaleLowerCase())
      )
    );
  }, [countries, filter]);

  return [filteredCountries, error];
};
