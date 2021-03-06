export {};
const db = require('../db');
const ApiError = require('../error/apiError');

class TagsService {
  async createTag(text: string) {
    const check = await db.query('select * from tags where text = $1', [text]);
    if (check.rows[0] !== undefined) {
      throw new ApiError.BadRequest('Такой тег уже существует');
    }
    const tag = await db.query(
      'insert into tags (text) values($1) returning *',
      [text],
    );
    return tag.rows[0];
  }

  async getAllTags() {
    const tags = await db.query(`select * from tags`);
    return tags.rows;
  }

  async getTagsByCollId(id: number) {
    const tags = await db.query(
      `select * from tags left join collection_tags 
    on tags.id = collection_tags.tags_id
    where collection_tags.collection_id = $1`,
      [id],
    );
    return tags.rows;
  }
}

module.exports = new TagsService();
