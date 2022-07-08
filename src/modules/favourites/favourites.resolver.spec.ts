import { Test, TestingModule } from '@nestjs/testing';
import { FavouritesResolver } from './favourites.resolver';
import { FavouritesService } from './favourites.service';

describe('FavouritesResolver', () => {
  let resolver: FavouritesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavouritesResolver, FavouritesService],
    }).compile();

    resolver = module.get<FavouritesResolver>(FavouritesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
