import { Controller, Get } from '@nestjs/common';
import { BaseController } from './base.controller';
import { ResultStatus } from '@/packages/utils/ResultStatus';
import { Role } from '@/packages/decorators';

@Controller('User')
export class UserController extends BaseController {
  @Get('info')
  @Role('admin')
  info() {
    return this.JsonBackResult(ResultStatus.Success, { name: 'sa', age: 23 });
  }
}
