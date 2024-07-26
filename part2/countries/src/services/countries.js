import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = async () => {
  const request = axios.get(baseUrl);

  return request.then(({ data }) => data);
};

export default { getAll };
