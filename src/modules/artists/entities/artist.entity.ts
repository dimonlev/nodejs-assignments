import { Band } from 'src/modules/bands/entities/band.entity';

export class Artist {
  id: string;
  firstName: string;
  secondName: string;
  middleName?: string;
  birthDate?: string;
  birthPlace?: string;
  country: string;
  bands?: Band[];
  instruments?: string[];
}
