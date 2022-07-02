import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BandsService } from '../bands/bands.service';
import { Band } from '../bands/entities/band.entity';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';
import { Artist } from './entities/artist.entity';
import { ArtistResponse } from './types/artistResponse.type';
import { ArtistsResponse } from './types/artistsResponse.type';

@Injectable()
export class ArtistsService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
    private bandsService: BandsService,
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
      console.log(err);
    }
  }

  async findAll(): Promise<Artist[]> {
    try {
      const { data } = await this.httpService.axiosRef.get<ArtistsResponse>(
        `${this.configService.get<string>('ARTISTS_URL')}`,
      );
      console.log(data);
      return data.items.map((artist) => {
        return { ...artist, id: artist._id };
      });
    } catch (err) {
      console.log(err);
    }
  }

  async findOne(id: string) {
    try {
      const { data } = await this.httpService.axiosRef.get<ArtistResponse>(
        `${this.configService.get<string>('ARTISTS_URL')}/${id}`,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.log(err);
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
      const bands = await Promise.all(
        updateArtistInput.bands.map((band) =>
          this.bandsService.update(band.id, band, token),
        ),
      );
      console.log({ ...data, id: data._id, bands: bands });
      return { ...data, id: data._id, bands: bands };
    } catch (err) {
      console.log(err);
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
      console.log(err);
    }
  }
}
