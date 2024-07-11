import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import { BaseController } from './base.controller';
import { ResultStatus } from '@/packages/utils/ResultStatus';
import { User } from '@/dto';
import { UnLoginException } from '@/packages/filter';
// import { Role } from '@/packages/decorators';
// import Apis from '@/apis';

@Controller({
  path: 'User',
  // version: VERSION_NEUTRAL,
})
export class UserController extends BaseController {
  @Get('info')
  // @Role('admin')
  async info(@Query('no', ParseIntPipe) no: number) {
    console.log('no', no);
    throw new UnLoginException('no login');
    // const res = await (Apis as any).bff.query();
    // console.log(res);
    return this.JsonBackResult(ResultStatus.Success, {});
  }

  @Version('2')
  @Get('/all')
  findAll_2() {
    return this.JsonBackResult(ResultStatus.Success, '版本2');
  }

  @Get('/all')
  findAll() {
    return this.JsonBackResult(ResultStatus.Success, '版本1');
  }

  @Post('/create')
  async create(@Body() user: User) {
    console.log(user);
  }
}
