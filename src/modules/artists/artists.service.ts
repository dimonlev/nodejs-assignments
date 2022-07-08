import { HttpService } from '@nestjs/axios';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BandsService } from '../bands/bands.service';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';
import { Artist } from './entities/artist.entity';
import { ArtistResponse } from './types/artistResponse.type';
import { ArtistsResponse } from './types/artistsResponse.type';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async create(artist: CreateArtistInput, token: string): Promise<Artist> {
    try {
      const { data } = await this.httpService.axiosRef.post<ArtistResponse>(
        `${this.configService.get<string>('ARTISTS_URL')}`,
        artist,
        { headers: { Authorization: `${token}` } },
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }

  async findAll(limit: string, offset: string): Promise<Artist[]> {
    try {
      const { data } = await this.httpService.axiosRef.get<ArtistsResponse>(
        `${this.configService.get<string>(
          'ARTISTS_URL',
        )}?limit=${limit}&offset=${offset}`,
      );
      return await Promise.all(
        data.items.map(async (artist) => {
          return { ...artist, id: artist._id };
        }),
      );
    } catch (err) {
      console.error(err);
    }
  }

  async findOne(id: string): Promise<Artist> {
    try {
      const { data } = await this.httpService.axiosRef.get<ArtistResponse>(
        `${this.configService.get<string>('ARTISTS_URL')}/${id}`,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }

  async update(
    id: string,
    updateArtistInput: UpdateArtistInput,
    token: string,
  ): Promise<Artist> {
    try {
      const { data } = await this.httpService.axiosRef.put<ArtistResponse>(
        `${this.configService.get<string>('ARTISTS_URL')}/${id}`,
        updateArtistInput,
        { headers: { Authorization: `${token}` } },
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }

  async remove(id: number, token: string) {
    try {
      await this.httpService.axiosRef.delete<Artist>(
        `${this.configService.get<string>('ARTISTS_URL')}/${id}`,
        { headers: { Authorization: `${token}` } },
      );
      return true;
    } catch (err) {
      console.error(err);
    }
  }
}
