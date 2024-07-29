const CountryData = ({ country }) => {
  const { area, capital, flags, languages, name } = country;
  const { png, alt } = flags;

  return (
    <>
      <h1>{name.official}</h1>
      <div>capital {capital[0]}</div>
      <div>area {area}</div>
      <h2>languages</h2>
      <ul>
        {Object.keys(languages).map((key) => (
          <li key={languages[key]}>{languages[key]}</li>
        ))}
      </ul>
      <img src={png} alt={alt} />
    </>
  );
};

export default CountryData;
