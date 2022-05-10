export { };
import { AnyTxtRecord } from 'dns';
import { CollectionPayload, Collection } from '../config/collectionPayload';
const ApiError = require('../error/apiError');
// import db from '../db';
const db = require('../db');
const itemService = require('./itemService');
const fileService = require('./fileService');
const tagsService = require('./tagsService');

class CollectionService {
  async createCollection(
    owner_id: number,
    title: string,
    description: string,
    image: any,
  ) {
    const imageName = await fileService.createFile(image);
    const collection = await db.query(
      'Insert into collections (title, description, image, owner_id) values($1, $2, $3, $4) returning *',
      [title, description, imageName, owner_id],
    );
    console.log(collection.rows[0].id);
    return collection.rows[0];
  }

  async addCollectTags(id: number, tags: any) {
    tags = JSON.parse(tags);
    tags.forEach((tag: { id: any }) => {
      db.query(
        'INSERT INTO collection_tags (collection_id, tags_id) values($1, $2) returning *',
        [id, tag.id],
      );
    });
  }

  async getCollections() {
    const collections = await db.query(`select 
    col.id, col.title, col.description, col.image, col.owner_id, users.email,
      json_agg(tags)
      as tags
    from collections as col
    inner join collection_tags as col_tags
    on col.id = col_tags.collection_id
    inner join tags on col_tags.tags_id = tags.id
    inner join users on col.owner_id = users.id
    group by col.id, users.id order by col.id asc`);
    return collections.rows;
    // return collections;
  }

  async getCollectionsByUserId(id: number): Promise<Collection[]> {
    const userCollections = await db.query(
      `select 
        col.id, col.title, col.description, col.image, col.owner_id,
        json_agg(tags)
        as tags
        from collections as col
        inner join collection_tags as col_tags
        on col.id = col_tags.collection_id
        inner join tags on col_tags.tags_id = tags.id
        where col.owner_id = $1
        group by col.id order by col.id asc`,
      [id],
    );
    return userCollections.rows;
  }

  async deleteCollection(
    id: number,
    colId: number,
    role: string,
  ): Promise<void> {
    const { collection } = await this.getColById(colId);
    console.log(collection.rows[0]);
    if (role === 'ADMIN' || collection.rows[0].owner_id === id) {
      await db.query('Delete from collections where id = $1', [colId]);
    } else {
      throw ApiError.NoAccesRights();
    }
  }

  async getColById(id: number) {
    const collection = await db.query(
      `select
       col.id, col.title, col.description, col.image, col.owner_id,
       json_agg(tags)::jsonb
          as tags
       from collections as col
       inner join collection_tags as col_tags
       on col.id = col_tags.collection_id
       inner join tags on col_tags.tags_id = tags.id
       where col.id = $1
       group by col.id order by col.id asc`,
      [id],
    );
    const collectItems = await itemService.getItemsByCollectId(id);
    if (collection.rows[0] === undefined) {
      throw ApiError.BadRequest('Такой коллекции не существует');
    }
    return { collection, collectItems };
  }

  public async updateCollection(
    id: number,
    payload: any,
    colId: number,
    image: any = undefined,
  ): Promise<Collection> {
    const { collection } = await this.getColById(colId);
    if (collection.rows[0].owner_id !== id) {
      throw ApiError.NoAccesRights();
    }
    if (image != undefined) {
      const imageName = await fileService.createFile(image.image);
      await db.query(
        'Update collections set title = $1, description = $2, image = $3 where id = $4 returning *',
        [payload.title, payload.description, imageName, colId],
      );
    } else {
      await db.query(
        'Update collections set title = $1, description = $2   where id = $3 returning *',
        [payload.title, payload.description, colId],
      );
    }
    
    if (payload.tags !== undefined && collection.rows[0].tags !== payload.tags) {
      await this.updateCollectionTags(colId, payload.tags);
    }
    const collect = await this.getColById(colId);
    console.log(collect.collection.rows[0]);
    return collect.collection.rows[0];
  }

  public async updateCollectionTags(colId: number, tags: any) {
    tags = JSON.parse(tags);
    const collTags = await tagsService.getTagsByCollId(colId);
    console.log(collTags);
    tags.forEach((tag: any) => {
      console.log(collTags.find((i: any) => i.tags_id === tag.id));
      if (collTags.find((i: any) => i.tags_id === tag.id) === undefined) {
        db.query(
          'INSERT INTO collection_tags (collection_id, tags_id) values($1, $2) returning *',
          [colId, tag.id],
        );
      }
    });
  }

  public async getCollByTags(tags: any) {
    const queryArr = tags.join(', ')
    const queryArrLength = queryArr.split(/\s+/).length;
    console.log(`${tags}`);
    console.log(queryArr)
    console.log(queryArrLength);
    console.log(`(${queryArr})`)
    const collections = await db.query(`
    select 
    col.id, col.title, col.description, col.image, col.owner_id, users.email,
      json_agg(tags)
      as tags
    from collections as col
    inner join collection_tags as col_tags
    on col.id = col_tags.collection_id
    inner join tags on col_tags.tags_id = tags.id
    inner join users on col.owner_id = users.id
    where col_tags.tags_id in (${queryArr})
    group by col.id, users.id
    HAVING count(distinct col_tags.tags_id) = ${queryArrLength}
    order by col.id asc
    `);
    console.log(collections.rows)
    return collections.rows;
  }
}
module.exports = new CollectionService();
