import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initLiquid } from '../packages/utils/liquid';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const liquidIns = initLiquid();
  app.setViewEngine('liquid');
  app.setBaseViewsDir('src/views/pages');
  app.engine('liquid', liquidIns.express());
  await app.listen(3000);
}
bootstrap();
