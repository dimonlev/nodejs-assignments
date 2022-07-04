export class CreateArtistInput {
  firstName: string;
  secondName: string;
  middleName?: string;
  birthDate?: string;
  birthPlace?: string;
  country: string;
  bandsIds?: string[];
  instruments?: string[];
}
