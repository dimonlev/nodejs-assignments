import { CreateAlbumInput } from './create-album.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAlbumInput extends PartialType(CreateAlbumInput) {
  id: string;
}
