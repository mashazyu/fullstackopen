import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);

  return request.then(({ data }) => data);
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const { data } = await request;

  return data;
};

const destroy = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  const { data } = await request;

  return data;
};

export default {
  getAll,
  create,
  destroy,
};
