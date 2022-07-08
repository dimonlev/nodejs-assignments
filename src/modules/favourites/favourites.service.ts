import { Injectable } from '@nestjs/common';
import { CreateFavouriteInput } from './dto/create-favourite.input';
import { UpdateFavouriteInput } from './dto/update-favourite.input';

@Injectable()
export class FavouritesService {
  create(createFavouriteInput: CreateFavouriteInput) {
    return 'This action adds a new favourite';
  }

  findAll() {
    return `This action returns all favourites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favourite`;
  }

  update(id: number, updateFavouriteInput: UpdateFavouriteInput) {
    return `This action updates a #${id} favourite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favourite`;
  }
}
