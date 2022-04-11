const tablesPayload = `
  CREATE TABLE IF NOT EXISTS
  users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    role VARCHAR(128) default 'USER' NOT NULL,
    status VARCHAR(128) default 'ACTIVE' NOT NULL
  );

  CREATE TABLE IF NOT EXISTS
  collections (
    id SERIAL PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    description VARCHAR(128) NOT NULL,
    image VARCHAR(128) NOT NULL,
    owner_id integer,
    FOREIGN KEY (owner_id) references users(id)
  );

  CREATE TABLE IF NOT EXISTS
  items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    description VARCHAR(128) NOT NULL,
    image VARCHAR(128) NOT NULL,
    collection_id integer,
    FOREIGN KEY (collection_id) references collections(id)
  );

  CREATE TABLE IF NOT EXISTS
  tags (
    id SERIAL PRIMARY KEY,
    text VARCHAR(128) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS
  collection_tags (
    collection_id integer NOT NULL,
    tags_id integer NOT NULL,
    PRIMARY KEY(collection_id, tags_id),
    FOREIGN KEY (collection_id) references collections,
    FOREIGN KEY (tags_id) references tags
  )

`;
module.exports = tablesPayload;
