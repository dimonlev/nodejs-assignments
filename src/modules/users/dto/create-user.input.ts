export class CreateUserInput {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  favouriteArtistIds?: string[];
  favouriteSongsIds?: string[];
  favouriteBandsIds?: string[];
  favouriteGenresIds?: string[];
}
