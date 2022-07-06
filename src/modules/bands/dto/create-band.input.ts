import { Member } from '../entities/member.entity';

export class CreateBandInput {
  name: string;
  origin: string;
  members: { id: string; years: string[] }[];
  website: string;
  genresIds: string[];
}
