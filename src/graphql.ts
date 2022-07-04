
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateArtistInput {
    firstName: string;
    secondName: string;
    middleName?: Nullable<string>;
    birthDate?: Nullable<string>;
    birthPlace?: Nullable<string>;
    country: string;
    bandsIds?: Nullable<Nullable<string>[]>;
    instruments?: Nullable<string>;
}

export interface UpdateArtistInput {
    id: string;
    firstName?: Nullable<string>;
    secondName?: Nullable<string>;
    middleName?: Nullable<string>;
    birthDate?: Nullable<string>;
    birthPlace?: Nullable<string>;
    country?: Nullable<string>;
    bandsIds?: Nullable<Nullable<string>[]>;
    instruments?: Nullable<string>;
}

export interface CreateBandInput {
    name?: Nullable<string>;
    origin?: Nullable<string>;
    website?: Nullable<string>;
    genresIds?: Nullable<Nullable<string>[]>;
}

export interface UpdateBandInput {
    id: string;
    name?: Nullable<string>;
    origin?: Nullable<string>;
    website?: Nullable<string>;
    genresIds?: Nullable<Nullable<string>[]>;
}

export interface CreateGenreInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    country?: Nullable<string>;
    year?: Nullable<number>;
}

export interface UpdateGenreInput {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    country?: Nullable<string>;
    year?: Nullable<number>;
}

export interface UserRequest {
    password: string;
    email: string;
}

export interface CreateUserInput {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    favouriteArtistIds?: Nullable<Nullable<string>[]>;
    favouriteSongsIds?: Nullable<Nullable<string>[]>;
    favouriteBandsIds?: Nullable<Nullable<string>[]>;
    favouriteGenresIds?: Nullable<Nullable<string>[]>;
}

export interface Artist {
    id: string;
    firstName: string;
    secondName: string;
    middleName?: Nullable<string>;
    birthDate?: Nullable<string>;
    birthPlace?: Nullable<string>;
    country: string;
    bands?: Nullable<Nullable<Band>[]>;
    instruments?: Nullable<string>;
}

export interface IQuery {
    artists(offset?: Nullable<number>, limit?: Nullable<number>): Nullable<Artist>[] | Promise<Nullable<Artist>[]>;
    artist(id: string): Nullable<Artist> | Promise<Nullable<Artist>>;
    bands(limit?: Nullable<number>, offset?: Nullable<number>): Nullable<Band>[] | Promise<Nullable<Band>[]>;
    band(id: string): Nullable<Band> | Promise<Nullable<Band>>;
    genres(limit?: Nullable<number>, offset?: Nullable<number>): Nullable<Genre>[] | Promise<Nullable<Genre>[]>;
    genre(id: string): Nullable<Genre> | Promise<Nullable<Genre>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
    jwt(user?: Nullable<UserRequest>): Nullable<Jwt> | Promise<Nullable<Jwt>>;
}

export interface IMutation {
    createArtist(createArtistInput: CreateArtistInput): Artist | Promise<Artist>;
    updateArtist(updateArtistInput: UpdateArtistInput): Artist | Promise<Artist>;
    removeArtist(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    createBand(createBandInput: CreateBandInput): Band | Promise<Band>;
    updateBand(updateBandInput: UpdateBandInput): Band | Promise<Band>;
    removeBand(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    createGenre(createGenreInput: CreateGenreInput): Genre | Promise<Genre>;
    updateGenre(updateGenreInput: UpdateGenreInput): Genre | Promise<Genre>;
    removeGenre(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    register(createUserInput: CreateUserInput): User | Promise<User>;
}

export interface Band {
    id: string;
    name?: Nullable<string>;
    origin?: Nullable<string>;
    website?: Nullable<string>;
    genres?: Nullable<Nullable<Genre>[]>;
}

export interface Genre {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    country?: Nullable<string>;
    year?: Nullable<number>;
}

export interface User {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    id: string;
    favouriteArtistIds?: Nullable<Nullable<string>[]>;
    favouriteSongsIds?: Nullable<Nullable<string>[]>;
    favouriteBandsIds?: Nullable<Nullable<string>[]>;
    favouriteGenresIds?: Nullable<Nullable<string>[]>;
}

export interface Jwt {
    jwt?: Nullable<string>;
}

type Nullable<T> = T | null;
