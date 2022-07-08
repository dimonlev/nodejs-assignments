import { Genre } from 'src/modules/genres/entities/genre.entity';
import { Member } from './member.entity';

export class Band {
  id: string;
  name?: string;
  origin?: string;
  members?: Member[];
  website?: string;
  genres?: Genre[];
}
