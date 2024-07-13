import { storage } from '@/packages/utils/file-storage';
import { FileMaxSizeValidator } from '@/packages/utils/file-max-size-validator';
import {
  Body,
  Controller,
  Get,
  ParseFilePipe,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Post } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'node:fs';

@Controller('file')
export class FileController {
  /**
   * @description 单个文件上传
   * @param file
   * @param body
   */
  @Post('single')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
      storage: storage,
    }),
  )
  single(
    @UploadedFile(
      new ParseFilePipe({
        // exceptionFactory(err: string) {
        //   throw new HttpException(err, HttpStatus.BAD_REQUEST);
        // },
        // validators: [
        //   new MaxFileSizeValidator({ maxSize: 1000 * 1024 }),
        //   new FileTypeValidator({ fileType: 'image/png' }),
        // ],
        validators: [new FileMaxSizeValidator({})],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('file', file);
  }

  /**
   * @description 多文件上传
   * @param files
   * @param body
   */
  @Post('mutil')
  @UseInterceptors(
    FilesInterceptor('files', 2, {
      dest: 'uploads',
      storage: storage,
    }),
  )
  mutil(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body) {
    console.log('body', body);
    console.log('files', files);
  }

  /**
   * @description 切片上传
   * @param files
   * @param body
   */
  @Post('sharding')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      dest: 'uploads',
    }),
  )
  sharding(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body) {
    console.log('body', body);
    console.log('files', files);

    const fileName = body.name.match(/(.+)\-\d+$/)[1];
    const chunkDir = 'uploads/chunks_' + fileName;

    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir);
    }

    fs.cpSync(files[0].path, chunkDir + '/' + body.name);
    fs.rmSync(files[0].path);
  }

  @Get('merge')
  merge(@Query('name') name: string) {
    const chunkDir = 'uploads/chunks_' + name;
    const files = fs.readdirSync(chunkDir);
    let startPos = 0;
    let count = 0;
    files.forEach((file) => {
      const filePath = chunkDir + '/' + file;
      const stream = fs.createReadStream(filePath);
      stream
        .pipe(
          fs.createWriteStream('uploads/' + name, {
            start: startPos,
          }),
        )
        .on('finish', () => {
          count++;
          if (count === files.length) {
            fs.rm(
              chunkDir,
              {
                recursive: true,
              },
              () => {},
            );
          }
        });
      startPos += fs.statSync(filePath).size;
    });
  }
}
