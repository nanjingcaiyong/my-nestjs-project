import { storage } from '@/packages/utils/file-storage';
import { FileMaxSizeValidator } from '@/packages/utils/file-max-size-validator';
import {
  Body,
  Controller,
  ParseFilePipe,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Post } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
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
}
