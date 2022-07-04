import { Genre } from 'src/modules/genres/entities/genre.entity';

export class Band {
  id: string;
  name: string;
  origin: string;
  // membersId: Member[];
  website: string;
  genres?: Genre[];
}
