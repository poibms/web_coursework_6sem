const ApiError = require('../error/apiError');

const bcrypt = require('bcrypt');
const db = require('../db');

class UserService {
  async registration(email: string, password: string): Promise<string> {
    let user;
    const checkCount = await db.query('select count(users.id) from users');
    const checkLogin = await db.query('Select * from users where email=$1', [
      email,
    ]);
    if (checkLogin.rows[0] !== undefined) {
      throw ApiError.BadRequest('User with such email has already been found');
    }
    const hashPassword = await bcrypt.hash(password, 4);

    if (checkCount.rows[0].count == 0) {
      user = await db.query(
        'Insert into users (email, password, role) values ($1, $2, $3) returning *',
        [email, hashPassword, 'ADMIN'],
      );
    } else {
      user = await db.query(
        'Insert into users (email, password) values ($1, $2) returning *',
        [email, hashPassword],
      );
    }
    console.log(user.rows[0]);
    return user.rows[0];
  }

  async login(email: string, password: string): Promise<string> {
    const user = await db.query('Select * from users where email=$1', [email]);
    if (user.rows[0] === undefined) {
      throw ApiError.BadRequest('Пользователь не найден');
    }
    const comparePassword = await bcrypt.compare(
      password,
      user.rows[0].password,
    );
    if (!comparePassword) {
      throw ApiError.BadRequest('Указан неверный пароль');
    }
    return user.rows[0];
  }

  async getUser(id: number) {
    const user = await db.query(
      'Select id, email, role, status from users where id = $1',
      [id],
    );
    return user.rows[0];
  }

  async limitationUser(role: string, id: number): Promise<void> {
    if(role !== 'ADMIN') {
      throw new ApiError.NoAccesRights()
    }
    const user = await this.getUser(id);
    if (user.status == 'ACTIVE') {
      await db.query('update users set status = $2 where id = $1 returning *', [id, 'BANNED']);
    } else {
      await db.query('update users set status = $2 where id = $1  returning *', [id, 'ACTIVE']);
    }
    const updated = await this.getUser(id);
    return updated
  }

  async getAllUsers() {
    const users = await db.query('select id, email, status, role from users')
    return users.rows;  
  }
}

module.exports = new UserService();
