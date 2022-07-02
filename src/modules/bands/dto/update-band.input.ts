import { CreateBandInput } from './create-band.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBandInput extends PartialType(CreateBandInput) {
  id: string;
  name: string;
  origin: string;
  // membersId: Member[];
  website: string;
  genresIds: string[];
}
