const Country = ({ country }) => {
  const { area, capital, flags, languages, name } = country;

  return (
    <div>
      <h1>{name.official}</h1>
      <div>capital {capital.map((capitalName) => capitalName)}</div>
      <div>area {area}</div>
      <h2>languages</h2>
      <ul>
        {Object.keys(languages).map((key) => (
          <li key={languages[key]}>{languages[key]}</li>
        ))}
      </ul>
      <img src={flags.png} alt="flag" />
    </div>
  );
};

export default Country;
