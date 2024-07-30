import axios from "axios";
const baseUrl = "api/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);

  return request.then(({ data }) => data);
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const { data } = await request;

  return data;
};

const update = async (newObject, id) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const { data } = await request;

  return data;
};

const destroy = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  const { data } = await request;
  console.log("// data in destroy ", data);
  return data;
};

export default {
  getAll,
  create,
  destroy,
  update,
};
