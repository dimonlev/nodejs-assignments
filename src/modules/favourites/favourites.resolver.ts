import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FavouritesService } from './favourites.service';
import { CreateFavouriteInput } from './dto/create-favourite.input';
import { UpdateFavouriteInput } from './dto/update-favourite.input';

@Resolver('Favourite')
export class FavouritesResolver {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Mutation('createFavourite')
  create(@Args('createFavouriteInput') createFavouriteInput: CreateFavouriteInput) {
    return this.favouritesService.create(createFavouriteInput);
  }

  @Query('favourites')
  findAll() {
    return this.favouritesService.findAll();
  }

  @Query('favourite')
  findOne(@Args('id') id: number) {
    return this.favouritesService.findOne(id);
  }

  @Mutation('updateFavourite')
  update(@Args('updateFavouriteInput') updateFavouriteInput: UpdateFavouriteInput) {
    return this.favouritesService.update(updateFavouriteInput.id, updateFavouriteInput);
  }

  @Mutation('removeFavourite')
  remove(@Args('id') id: number) {
    return this.favouritesService.remove(id);
  }
}
