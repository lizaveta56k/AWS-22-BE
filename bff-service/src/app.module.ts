import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CacheModule.register({
    isGlobal: true,
    ttl: 120, // seconds
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
