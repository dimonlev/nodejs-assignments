import { CreateArtistInput } from './create-artist.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';
import { Band } from 'src/modules/bands/entities/band.entity';

export class UpdateArtistInput extends PartialType(CreateArtistInput) {
  @IsString()
  @IsOptional()
  id: string;
}
