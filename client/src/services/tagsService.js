import { $authHost, $host } from "./index";

export const createTag = async (text) => {
  const { tag } = await $authHost.post('/api/tags');
  console.log(tag);
  return 'success';
}

export const getAllTags = async () => {
  const {data} = await $host.get('/api/tags');
  return data.tags;
}