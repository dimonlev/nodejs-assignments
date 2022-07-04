import { CreateBandInput } from './create-band.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBandInput extends PartialType(CreateBandInput) {
  id: string;
  name: string;
  origin: string;
  membersId: string[];
  website: string;
  genresIds: string[];
}
