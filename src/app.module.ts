import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { controllers } from './controllers';
import { AppService } from './services/app.service';
import { ExceptionFilter } from '@/packages/filter';
import { AuthGuard } from '@/packages/guards';
import { CupsheMiddleware } from '@/packages/middleware/cupshe.middleware';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.API_ENV}`, '.env'],
    }),
  ],
  controllers: controllers,
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CupsheMiddleware).forRoutes('*');
  }
}
