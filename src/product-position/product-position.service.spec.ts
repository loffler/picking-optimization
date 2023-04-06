import { Test, TestingModule } from '@nestjs/testing';
import { ProductPositionService } from './product-position.service';

describe('ProductPositionService', () => {
  let service: ProductPositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductPositionService],
    }).compile();

    service = module.get<ProductPositionService>(ProductPositionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
