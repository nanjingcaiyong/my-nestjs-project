import { Controller, Get } from '@nestjs/common';
import { BaseController } from './base.controller';
import { ResultStatus } from '@/packages/utils/ResultStatus';

@Controller('User')
export class UserController extends BaseController {
  @Get('info')
  info() {
    return this.JsonBackResult(ResultStatus.Success, { name: 'sa', age: 23 });
  }
}
