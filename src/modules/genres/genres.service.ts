import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';
import { Genre } from './entities/genre.entity';
import { GenreResponse } from './types/genreResponse.interface';
import { GenresResponse } from './types/genresResponse.interface';

@Injectable()
export class GenresService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async create(
    createGenreInput: CreateGenreInput,
    token: string,
  ): Promise<Genre> {
    try {
      const { data } = await this.httpService.axiosRef.post<GenreResponse>(
        `${this.configService.get<string>('GENRES_URL')}`,
        createGenreInput,
        { headers: { Authorization: `${token}` } },
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }

  async findAll(limit: string, offset: string): Promise<Genre[]> {
    try {
      const { data } = await this.httpService.axiosRef.get<GenresResponse>(
        `${this.configService.get<string>(
          'GENRES_URL',
        )}?limit=${limit}&offset=${offset}`,
      );
      return data.items.map((genres) => {
        return { ...genres, id: genres._id };
      });
    } catch (err) {
      console.log(err);
    }
  }

  async findOne(id: string): Promise<Genre> {
    try {
      const { data } = await this.httpService.axiosRef.get<GenreResponse>(
        `${this.configService.get<string>('GENRES_URL')}/${id}`,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }

  async update(id: string, updateGenreInput: UpdateGenreInput, token: string) {
    try {
      const { data } = await this.httpService.axiosRef.put<GenreResponse>(
        `${this.configService.get<string>('GENRES_URL')}/${id}`,
        updateGenreInput,
        { headers: { Authorization: `${token}` } },
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.log(err);
    }
  }

  async remove(id: string, token: string) {
    try {
      await this.httpService.axiosRef.delete<Genre>(
        `${this.configService.get<string>('GENRES_URL')}/${id}`,
        { headers: { Authorization: `${token}` } },
      );
      return true;
    } catch (err) {
      console.error(err);
    }
  }
}
