import { Test, TestingModule } from '@nestjs/testing';
import { ControllerController } from './request-manager.controller';

describe('RequestManagerController', () => {
  let controller: ControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControllerController],
    }).compile();

    controller = module.get<ControllerController>(ControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
