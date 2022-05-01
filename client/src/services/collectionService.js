import { $authHost, $host } from "./index";

export const createCollection = async (collect) => {
  const { collection } = await $authHost.post('/api/collections', collect);
  return 'succesfully created';
}

export const getCollections = async () => {
  const { data } = await $host.get('/api/collections');
  return data;
}

export const getCollectionById = async (id) => {
  const { data } = await $host.get('/api/collections/' + id);
  console.log(data);
  return data
}

export const deleteCollection = async (id) => {
  const response = await $authHost.delete('/api/collections/' + id)
  return('succesfully deleted');
}

export const updateCollection = async(id, payload) => {
  const response = await $authHost.put('/api/collections/' + id, payload);
  console.log(response);
  return response.data;
}

export const usersCollections = async() => {
  const response = await $authHost.get('/api/collections/user');
  console.log(response.data);
  return response.data;
}

export const createItem = async(id, payload) => {
  const response = await $authHost.post('/api/collections/' + id, payload);
  return response.data;
}

export const deleteItem = async(id,  itemId) => {
  const res = await $authHost.delete(`/api/collections/${id}/${itemId}`);
  return 'success';
}

export const updateItem = async(id,  itemId, payload) => {
  const res = await $authHost.put(`/api/collections/${id}/${itemId}`, payload);
  console.log(res.data)
}