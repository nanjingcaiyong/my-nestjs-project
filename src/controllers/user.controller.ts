import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BaseController } from './base.controller';
import { ResultStatus } from '@/packages/utils/ResultStatus';
import { User } from '@/dto';
// import { Role } from '@/packages/decorators';
// import Apis from '@/apis';

@Controller('User')
export class UserController extends BaseController {
  @Get('info')
  // @Role('admin')
  async info(@Query('no', ParseIntPipe) no: number) {
    console.log('no', no);
    // const res = await (Apis as any).bff.query();
    // console.log(res);
    return this.JsonBackResult(ResultStatus.Success, {});
  }
  @Post('/create')
  async create(@Body() user: User) {
    console.log(user);
  }
}
