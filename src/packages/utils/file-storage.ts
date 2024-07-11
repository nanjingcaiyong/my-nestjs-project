import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';

/**
 * @description 文件存储策略
 */
const storage = multer.diskStorage({
  destination(req: Express.Request, file: Express.Multer.File, cb) {
    try {
      fs.mkdirSync(path.join(process.cwd(), 'my-uploads'));
    } catch (e) {}

    cb(null, path.join(process.cwd(), 'my-uploads'));
  },
  filename(req: Express.Request, file: Express.Multer.File, cb) {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export { storage };
