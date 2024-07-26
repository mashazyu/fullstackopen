import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import CountryList from "./components/CountryList";

import countriesService from "./services/countries";

function App() {
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(null);
  const [showCountry, setShowCountry] = useState(null);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setShowCountry(null);
  };

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
  if (filteredCountries?.length === 0) {
    setShowCountry(filteredCountries[0]);
  }

  return (
    <>
      <Filter
        text="find countries"
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <CountryList
        countries={filteredCountries}
        showCountry={showCountry}
        setCountry={setShowCountry}
      />
    </>
  );
}

export default App;
