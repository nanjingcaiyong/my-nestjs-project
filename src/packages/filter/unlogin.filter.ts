import { BaseController } from '@/controllers/base.controller';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ResultStatus } from '../utils/ResultStatus';

export class UnLoginException {
  message: string;

  constructor(message?) {
    this.message = message;
  }
}

@Catch()
export class UnloginFilter extends BaseController implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    res
      .status(HttpStatus.UNAUTHORIZED)
      .json(this.JsonBackResult(ResultStatus.NoLogin, exception.message));
  }
}
