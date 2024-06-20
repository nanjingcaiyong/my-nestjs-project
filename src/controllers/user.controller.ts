import { Controller, Get } from '@nestjs/common';
import { BaseController } from './base.controller';
import { ResultStatus } from '@/packages/utils/ResultStatus';
// import { Role } from '@/packages/decorators';
import Apis from '@/apis';

@Controller('User')
export class UserController extends BaseController {
  @Get('info')
  // @Role('admin')
  async info() {
    const res = await (Apis as any).bff.query();
    console.log(res);
    return this.JsonBackResult(ResultStatus.Success, res.data);
  }
}
