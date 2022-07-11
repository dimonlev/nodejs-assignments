import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONTEXT } from '@nestjs/graphql';
import { IncomingMessage } from 'http';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';
import { Genre } from './entities/genre.entity';
import { GenreResponse } from './types/genreResponse.interface';
import { GenresResponse } from './types/genresResponse.interface';

@Injectable()
export class GenresService {
  private baseUrl: string;
  constructor(
    @Inject(CONTEXT) { req: request }: { req: IncomingMessage },
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.httpService.axiosRef.interceptors.request.use((req) => {
      const receivedAuth = request.headers?.authorization;
      if (!req.headers.authorization && receivedAuth) {
        req.headers.authorization = receivedAuth;
      }
      return req;
    });
    this.baseUrl = this.configService.get<string>('GENRES_URL');
  }

  async create(createGenreInput: CreateGenreInput): Promise<Genre> {
    try {
      const { data } = await this.httpService.axiosRef.post<GenreResponse>(
        this.baseUrl,
        createGenreInput,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }

  async findAll(limit: string, offset: string): Promise<Genre[]> {
    try {
      const { data } = await this.httpService.axiosRef.get<GenresResponse>(
        `${this.baseUrl}?limit=${limit}&offset=${offset}`,
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
        `${this.baseUrl}/${id}`,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }

  async update(id: string, updateGenreInput: UpdateGenreInput) {
    try {
      const { data } = await this.httpService.axiosRef.put<GenreResponse>(
        `${this.baseUrl}/${id}`,
        updateGenreInput,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.log(err);
    }
  }

  async remove(id: string) {
    try {
      await this.httpService.axiosRef.delete<Genre>(`${this.baseUrl}/${id}`);
      return true;
    } catch (err) {
      console.error(err);
    }
  }
}
