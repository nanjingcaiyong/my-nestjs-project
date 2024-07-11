import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initLiquid } from './packages/utils/liquid';
import { NestExpressApplication } from '@nestjs/platform-express';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true, // 支持跨域
  });

  /**
   * 启用接口版本管理，通过url实现管理
   * 例如：
   * https://xxx.com/user/info
   * https://xxx.com/v2/user/info
   */
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const liquidIns = initLiquid();
  app.setViewEngine('liquid');
  app.setBaseViewsDir('src/views/pages');
  app.engine('liquid', liquidIns.express());
  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
