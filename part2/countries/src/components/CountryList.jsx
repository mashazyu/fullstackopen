import { useState } from "react";

import Country from "./Country";
import Filter from "./Filter";

import { useFetchCountries } from "../hooks/useFetchCountries";

const CountryList = () => {
  const [filter, setFilter] = useState("");
  const [countries, error] = useFetchCountries(filter);

  const handleFilterChange = (event) => setFilter(event.target.value);

  let component;

  if (countries?.length === 0) {
    component = <div>No countries matching your search criteria</div>;
  } else if (countries?.length === 1) {
    component = <Country countryName={countries[0].name.common} />;
  } else if (countries?.length >= 10) {
    component = <div>Too many matches, specify another filter</div>;
  } else {
    component = countries?.map((country) => (
      <div key={country.name.official}>
        {country.name.official}
        <button onClick={() => setFilter(country.name.common)}>show</button>
      </div>
    ));
  }

  if (error) return <>{error}</>;

  return (
    <>
      <Filter
        text="find countries"
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      {component}
    </>
  );
};

export default CountryList;
