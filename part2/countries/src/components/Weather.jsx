const Weather = ({ weather }) => {
  const { temp } = weather.main;
  const { speed } = weather.wind;
  const { icon, main } = weather.weather[0];

  return (
    <>
      <div>temperature {temp} Celcius</div>
      <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt={main} />
      <div>wind {speed} m/s</div>
    </>
  );
};

export default Weather;
