import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { controllers } from './controllers';
import { AppService } from './services/app.service';
import { CupsheMiddleware } from './packages/middleware/cupshe.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.API_ENV}`, '.env'],
    }),
  ],
  controllers: controllers,
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CupsheMiddleware).forRoutes('*');
  }
}
