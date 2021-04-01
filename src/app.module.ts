import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from "nestjs-pino/dist";
import { LoggerMiddleware } from './logger.middleware';


@Module({
  imports: [
    LoggerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
