export class CreateArtistInput {
  firstName: string;
  secondName: string;
  middleName?: string;
  birthDate?: string;
  birthPlace?: string;
  country: string;
  // bands: [Band]
  instruments?: string[];
}
