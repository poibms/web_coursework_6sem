export type CollectionPayload = {
  title: string;
  description: string;
  image: string;
};

export type Collection = {
  id: number;
  title: string;
  description: string;
  image: string;
  owner_id: number;
};
