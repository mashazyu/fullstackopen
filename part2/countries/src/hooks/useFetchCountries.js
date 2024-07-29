import { useEffect, useState } from "react";

import countriesService from "../services/countries";

export const useFetchCountries = (filter) => {
  const [countries, setCountries] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    countriesService
      .getAll()
      .then((initialData) => setCountries(initialData))
      .catch((error) => {
        setError(
          `The following error occured while retrieving data from the server: '${error}'.`
        );
      });

    return () => controller.abort();
  }, []);

  const filteredCountries = countries?.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLocaleLowerCase())
  );

  return [filteredCountries, error];
};
