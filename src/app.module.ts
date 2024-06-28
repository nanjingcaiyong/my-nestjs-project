import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { controllers } from './controllers';
import { AppService } from './services/app.service';
import { ExceptionFilter } from '@/packages/filter';
import { AuthGuard } from '@/packages/guards';
import { CupsheMiddleware } from '@/packages/middleware/cupshe.middleware';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoggerInterceptor } from '@/packages/interceptors';
import { ValidatorPipe } from '@/packages/pipes';

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
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidatorPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CupsheMiddleware).forRoutes('*');
  }
}
