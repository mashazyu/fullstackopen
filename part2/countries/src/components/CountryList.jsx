import Country from "./Country";

const CountryList = ({ countries, setCountries }) => {
  if (countries?.length >= 10)
    return <div>Too many matches, specify another filter</div>;

  if (countries?.length === 0)
    return <div>No countries matching your search criteria</div>;

  if (countries?.length === 1)
    return <Country countryName={countries[0].name.common} />;

  return (
    <>
      {countries?.map((country) => (
        <div key={country.name.official}>
          {country.name.official}
          <button onClick={() => setCountries([country])}>show</button>
        </div>
      ))}
    </>
  );
};

export default CountryList;
