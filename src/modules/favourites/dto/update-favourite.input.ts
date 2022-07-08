import { CreateFavouriteInput } from './create-favourite.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateFavouriteInput extends PartialType(CreateFavouriteInput) {
  id: number;
}
