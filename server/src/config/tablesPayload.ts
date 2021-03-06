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
    FOREIGN KEY (owner_id) references users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS
  items (
    id SERIAL PRIMARY KEY,
    title  VARCHAR(128) NOT NULL,
    description VARCHAR(128) NOT NULL,
    image VARCHAR(128) NOT NULL,
    collection_id integer,
    FOREIGN KEY (collection_id) references collections(id) ON DELETE CASCADE
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
    FOREIGN KEY (collection_id) references collections(id) ON DELETE CASCADE,
    FOREIGN KEY (tags_id) references tags(id) ON DELETE CASCADE
  )

`;
module.exports = tablesPayload;
