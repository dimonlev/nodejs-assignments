import { CreateArtistInput } from './create-artist.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';
import { Band } from 'src/modules/bands/entities/band.entity';

export class UpdateArtistInput extends PartialType(CreateArtistInput) {
  @IsString()
  @IsOptional()
  id: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  secondName: string;

  @IsOptional()
  @IsString()
  middleName: string;

  @IsOptional()
  @IsDate()
  birthDate: string;

  @IsOptional()
  @IsString()
  birthPlace: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsArray()
  bands: Band[];

  @IsOptional()
  @IsArray()
  instruments: string[];
}
