import { $authHost, $host } from "./index";

export const createCollection = async (collect) => {
  const { collection } = await $authHost.post('/api/collections', collect);

  return 'succesfully created';
}