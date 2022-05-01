export {};
import { itemsPayload } from '../config/itemsPayload';

const ApiError = require('../error/apiError');
const db = require('../db');
const fileService = require('./fileService');

class ItemService {
  async createItem(
    title: string,
    description: string,
    image: any,
    collectId: number,
    id: number,
  ) {
    // const { collection } = await collectionService.getColById(collectId);
    const collection = await db.query(
      `select * from collections as col where col.id = $1`,
      [collectId],
    );
    console.log(collection.rows[0]);
    if (collection.rows[0].owner_id !== id) {
      throw ApiError.NoAccesRights();
    }
    const imageName = await fileService.createFile(image);
    const item = await db.query(
      'Insert into items (title, description, image, collection_id) values($1, $2, $3, $4) returning *',
      [title, description, imageName, collectId],
    );
    return item.rows[0];
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

  async getItemsById(id: number) {
    const items = await db.query(
      'select * from items where items.id = $1',
      [id],
    );
    return items.rows[0];
  }

  public async updateItem(
    id: number,
    payload: any,
    itemId: number,
    image: any = undefined,
  ) {
    console.log(image);
    let imageName;
    if(image != undefined) {
      imageName = await fileService.createFile(image.image);
      await db.query(
        'Update items set title = $1, description = $2, image = $3 where id = $4 returning *',
        [payload.title, payload.description, imageName, itemId],
      );
    } else {
      await db.query(
        'Update items set title = $1, description = $2 where id = $3 returning *',
        [payload.title, payload.description, itemId],
      );
    }
   
    const collect = await this.getItemsById(itemId);
    console.log(collect);
    return collect;
  }

}
module.exports = new ItemService();
