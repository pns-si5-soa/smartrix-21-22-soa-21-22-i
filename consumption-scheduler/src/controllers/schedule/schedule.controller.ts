import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ScheduleService } from 'src/services/schedule/schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  setDate(@Body('dayDate') dayDate: Date) {
    this.scheduleService.setDate(dayDate);
  }

  @Get()
  getSchedule(
    @Query('ID') houseID: number,
    @Query('consumptionTime') consumptionTime,
  ): Date[] {
    console.log(
      '[schedule][getSchedule] houseID:number ' + houseID + ' => string[]',
    );
    return this.scheduleService.getSchedule(houseID, consumptionTime);
  }
}
