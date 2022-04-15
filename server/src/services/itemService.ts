export {};
import { itemsPayload } from '../config/itemsPayload';

const ApiError = require('../error/apiError');
const db = require('../db');
const collectionService = require('./collectionService');

class ItemService {
  async createItem(payload: itemsPayload, collectId: number, id: number) {
    const { title, description, image } = payload;
    console.log(id);
    // const { collection } = await collectionService.getColById(collectId);
    const collection = await db.query(
      `select * from collections as col where col.id = $1`,
      [collectId],
    );
    console.log(collection.rows[0]);
    if (collection.rows[0].owner_id === id) {
      const item = await db.query(
        'Insert into items (title, description, image, collection_id) values($1, $2, $3, $4) returning *',
        [title, description, image, collectId],
      );
      return item.rows[0];
    } else {
      throw ApiError.NoAccesRights();
    }
  }

  async deleteItem(id: number, colId: number, itemId: number): Promise<void> {
    // const collection = await collectionService.getColById(colId);
    const collection = await db.query(
      `select * from collections as col where col.id = $1`,
      [colId],
    );
    if (collection.rows[0].owner_id === id) {
      await db.query('Delete from items where id = $1', [itemId]);
    } else {
      throw ApiError.NoAccesRights();
    }
  }

  async getItemsByCollectId(id: number) {
    const items = await db.query(
      'select * from items where items.collection_id = $1',
      [id],
    );
    return items.rows;
  }
}
module.exports = new ItemService();
