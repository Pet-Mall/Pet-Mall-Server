import { Test, TestingModule } from '@nestjs/testing';
import { SystemLogsService } from './system-logs.service';

describe('SystemLogsService', () => {
  let service: SystemLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemLogsService],
    }).compile();

    service = module.get<SystemLogsService>(SystemLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
