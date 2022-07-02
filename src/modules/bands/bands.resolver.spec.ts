import { Test, TestingModule } from '@nestjs/testing';
import { BandsResolver } from './bands.resolver';
import { BandsService } from './bands.service';

describe('BandsResolver', () => {
  let resolver: BandsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BandsResolver, BandsService],
    }).compile();

    resolver = module.get<BandsResolver>(BandsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
