import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class RouterController {
  constructor(private readonly appService: AppService) {}

  @Render('Home')
  @Get()
  getHello(): any {
    return { name: 'zhangsan', age: 23 };
  }
}
