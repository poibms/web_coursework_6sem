export {};
import { CollectionPayload, Collection } from '../config/collectionPayload';

const ApiError = require('../error/apiError');
const db = require('../db');
const itemService = require('./itemService');
const fileService = require('./fileService');

class CollectionService {
  async createCollection(
    owner_id: number,
    title: string,
    description: string,
    image: any,
    tags: number[],
  ) {
    // const imageName = await fileService.createFile(image);
    const collection = await db.query(
      'Insert into collections (title, description, image, owner_id) values($1, $2, $3, $4) returning *',
      [title, description, image, owner_id],
    );
    await this.addCollectTags(collection.rows[0].id, tags);
    return collection.rows[0];
  }

  async addCollectTags(id: number, tags: number[]) {
    for (const i in tags) {
      await db.query(
        'INSERT INTO collection_tags (collection_id, tags_id) values($1, $2) returning *',
        [id, tags[i]],
      );
    }
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
      `select * from collections as col where col.id = $1`,
      [id],
    );
    const collectItems = await itemService.getItemsByCollectId(id);
    console.log(collectItems);
    if (collection.rows[0] === undefined) {
      throw ApiError.BadRequest('Такой коллекции не существует');
    }
    return { collection, collectItems };
  }

  public async updateCollection(
    id: number,
    payload: CollectionPayload,
    colId: number,
  ): Promise<Collection> {
    const { collection } = await this.getColById(colId);
    console.log(payload.image);
    if (collection.rows[0].owner_id !== id) {
      throw ApiError.NoAccesRights();
    }
    const imageName = await fileService.createFile(payload.image);
    await db.query(
      'Update collection set title = $1, description = $2, image = $3 where id = $4 returning *',
      [payload.title, payload.description, imageName, payload.image, colId],
    );
    const collect = await this.getColById(id);
    console.log(collect.collection.rows[0]);
    return collect.collection.rows[0];
  }
}
module.exports = new CollectionService();
