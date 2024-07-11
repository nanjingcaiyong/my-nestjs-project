import { FileValidator } from '@nestjs/common';
export class FileMaxSizeValidator extends FileValidator {
  constructor(options) {
    super(options);
  }

  isValid(file?: Express.Multer.File): boolean | Promise<boolean> {
    if (file.size > 10 * 1024) {
      return false;
    }
    return true;
  }

  buildErrorMessage(file: Express.Multer.File): string {
    return `文件${file.originalname} 文件超出 10kb`;
  }
}
