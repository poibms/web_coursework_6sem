import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
const ApiError = require('../error/apiError');

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
  AVATAR = 'avatar',
}

class FileService {
  async createFile(file: any): Promise<string> {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new ApiError.badRequest('Что-то пошло не так :(');
    }
  }
}

module.exports = new FileService();
