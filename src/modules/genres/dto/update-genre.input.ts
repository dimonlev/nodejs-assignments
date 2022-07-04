import { CreateGenreInput } from './create-genre.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateGenreInput extends PartialType(CreateGenreInput) {
  id: string;
}
