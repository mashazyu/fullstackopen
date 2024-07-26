import Country from "./Country";

const CountryList = ({ countries }) => {
  if (countries?.length >= 10)
    return <div>Too many matches, specify another filter</div>;

  if (countries?.length === 1) return <Country country={countries[0]} />;

  return (
    <div>
      {countries?.map((country) => (
        <div key={country.name.official}>{country.name.official}</div>
      ))}
    </div>
  );
};

export default CountryList;
