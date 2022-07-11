import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONTEXT } from '@nestjs/graphql';
import { IncomingMessage } from 'http';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';
import { Artist } from './entities/artist.entity';
import { ArtistResponse } from './types/artistResponse.type';
import { ArtistsResponse } from './types/artistsResponse.type';

@Injectable()
export class ArtistsService {
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
    this.baseUrl = this.configService.get<string>('ARTISTS_URL');
  }

  async create(createArtistInput: CreateArtistInput): Promise<Artist> {
    try {
      const { data } = await this.httpService.axiosRef.post<ArtistResponse>(
        this.baseUrl,
        createArtistInput,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }

  async findAll(limit: string, offset: string): Promise<Artist[]> {
    try {
      const { data } = await this.httpService.axiosRef.get<ArtistsResponse>(
        `${this.baseUrl}?limit=${limit}&offset=${offset}`,
      );
      return data.items.map((artist) => {
        return { ...artist, id: artist._id };
      });
    } catch (err) {
      console.error(err);
    }
  }

  async findOne(id: string): Promise<Artist> {
    try {
      const { data } = await this.httpService.axiosRef.get<ArtistResponse>(
        `${this.baseUrl}/${id}`,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }

  async update(
    id: string,
    updateArtistInput: UpdateArtistInput,
  ): Promise<Artist> {
    try {
      const { data } = await this.httpService.axiosRef.put<ArtistResponse>(
        `${this.baseUrl}/${id}`,
        updateArtistInput,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }

  async remove(id: string) {
    try {
      await this.httpService.axiosRef.delete<Artist>(`${this.baseUrl}/${id}`);
      return true;
    } catch (err) {
      console.error(err);
    }
  }
}
