import { Member } from '../entities/member.entity';

export interface BandResponse {
  _id: string;
  name: string;
  origin: string;
  members: Member[];
  website: string;
  genresIds: string[];
}
