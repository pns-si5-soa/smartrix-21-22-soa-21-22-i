import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleService } from 'src/services/schedule/schedule.service';
import { ScheduleController } from './schedule.controller';

describe('ScheduleController', () => {
  let service: ScheduleService;
  let controller: ScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [ScheduleService],
    }).compile();

    service = module.get<ScheduleService>(ScheduleService);
    controller = module.get<ScheduleController>(ScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Have the correct schedule', () => {
    expect(controller.getSchedule(1)).toEqual(service.getSchedule(1));
  });
});
