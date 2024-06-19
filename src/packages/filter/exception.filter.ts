import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as NestExceptionFilter,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseController } from '../../controllers/base.controller';
import { ResultStatus } from '../utils/ResultStatus';

@Catch()
export class ExceptionFilter<T extends Error>
  extends BaseController
  implements NestExceptionFilter
{
  constructor() {
    super();
  }
  catch(exception: T, host: ArgumentsHost) {
    switch (host.getType()) {
      case 'http':
        {
          Logger.error(exception.message, exception.stack);
          const ctx = host.switchToHttp();
          const res = ctx.getResponse<Response>();
          res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
              this.JsonBackResult(ResultStatus.Fail, {}, exception.message),
            );
        }
        break;
      case 'ws':
        break;
      case 'rpc':
        break;
    }
  }
}
