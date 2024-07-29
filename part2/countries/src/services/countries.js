import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = async () => {
  const request = axios.get(`${baseUrl}/all`);

  return request.then(({ data }) => data);
};

const get = async (name) => {
  const request = axios.get(`${baseUrl}/name/${name}`);

  return request.then(({ data }) => data);
};

export default { getAll, get };
