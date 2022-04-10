const ApiError = require('../error/apiError');

const bcrypt = require('bcrypt');
const db = require('../db');

class UserService {
  async registration (email: string, password: string): Promise<string> {
    const checkLogin = await db.query('Select * from users where email=$1', [email]);
    if(checkLogin.rows[0] !== undefined) {
      throw ApiError.BadRequest('User with such email has already been found');
    }
    const hashPassword = await bcrypt.hash(password, 4);
    const user = await db.query('Insert into users (email, password) values ($1, $2) returning *', [email, hashPassword])
    return user.rows[0];
  }

  async login(email: string, password: string): Promise<string> {
    const user = await db.query('Select * from users where email=$1', [email]);
    if(user.rows[0] === undefined) {
      throw ApiError.BadRequest("Пользователь не найден");
    }
    let comparePassword = await bcrypt.compare(password, user.rows[0].password);
    if(!comparePassword) {
      throw ApiError.BadRequest("Указан неверный пароль");
    }
    return user.rows[0];
  }

  async getUser(id: number) {
    const user = await db.query('Select id, email, role from users where id = $1', [id]);
    return user.rows[0];
  }
}

module.exports = new UserService();