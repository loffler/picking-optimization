import { Test, TestingModule } from '@nestjs/testing';
import { NearestPickingService } from './nearest-picking.service';

describe('NearestPickingService', () => {
  let service: NearestPickingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NearestPickingService],
    }).compile();

    service = module.get<NearestPickingService>(NearestPickingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
