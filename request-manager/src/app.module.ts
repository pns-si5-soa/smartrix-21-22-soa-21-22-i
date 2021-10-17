import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestManagerService } from './service/request-manager.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, RequestManagerService],
})
export class AppModule {}
