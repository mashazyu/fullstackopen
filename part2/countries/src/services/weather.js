import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const key = import.meta.env.VITE_WEATHER_KEY; //"861b19c352f56e93f14b291fdca2fe6d";

const get = async ({ lat, lon }) => {
  const request = axios.get(
    `${baseUrl}?units=metric&lat=${lat}&lon=${lon}&appid=${key}`
  );

  return request.then(({ data }) => data);
};

export default { get };
