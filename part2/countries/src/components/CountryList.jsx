import Country from "./Country";

const CountryList = ({ countries, setCountry, showCountry }) => {
  if (countries?.length >= 10)
    return <div>Too many matches, specify another filter</div>;

  const setShowCountry = (name) => setCountry(name);

  if (showCountry) return <Country country={showCountry} />;

  return (
    <>
      {countries?.map((country) => (
        <div key={country.name.official}>
          {country.name.official}
          <button onClick={() => setShowCountry(country)}>show</button>
        </div>
      ))}
    </>
  );
};

export default CountryList;
