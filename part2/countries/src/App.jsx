import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import CountryList from "./components/CountryList";

import countriesService from "./services/countries";

function App() {
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(null);

  const handleFilterChange = (event) => setFilter(event.target.value);

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

  if (error) return <>{error}</>;

  return (
    <>
      <Filter
        text="find countries"
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <CountryList
        countries={filteredCountries}
        setCountries={setFilteredCountries}
      />
    </>
  );
}

export default App;
