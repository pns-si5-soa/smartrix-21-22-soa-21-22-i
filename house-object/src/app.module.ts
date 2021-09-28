import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumptionService } from './services/consumption/consumption.service';
import { ConsumptionController } from './controllers/consumption/consumption.controller';
import { ScheduleController } from './controllers/schedule/schedule.controller';
import { ScheduleService } from './services/schedule/schedule.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController, ConsumptionController, ScheduleController],
  providers: [AppService, ConsumptionService, ScheduleService],
})
export class AppModule {}
