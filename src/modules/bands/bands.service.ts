import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Genre } from '../genres/entities/genre.entity';
import { GenresService } from '../genres/genres.service';
import { CreateBandInput } from './dto/create-band.input';
import { UpdateBandInput } from './dto/update-band.input';
import { Band } from './entities/band.entity';
import { BandsResponse } from './types/bandsResponse.type';

@Injectable()
export class BandsService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly genresService: GenresService,
  ) {}

  async create(band: CreateBandInput, token: string): Promise<Band> {
    try {
      const { data } = await this.httpService.axiosRef.post<BandResponse>(
        `${this.configService.get<string>('BANDS_URL')}`,
        band,
        { headers: { Authorization: `${token}` } },
      );
      if (data.genresIds) {
        const genres = await this.getGenres(data.genresIds);
        return { ...data, id: data._id, genres: genres };
      }
      return { ...data, id: data._id };
    } catch (err) {
      console.log(err);
    }
  }

  async findOne(id: string): Promise<Band> {
    try {
      const { data } = await this.httpService.axiosRef.get<BandResponse>(
        `${this.configService.get<string>('BANDS_URL')}/${id}`,
      );
      if (data.genresIds) {
        const genres = await this.getGenres(data.genresIds);
        return { ...data, id: data._id, genres: genres };
      }
      return { ...data, id: data._id };
    } catch (err) {
      console.log(err);
    }
  }

  async findAll(limit: string, offset: string): Promise<Band[]> {
    try {
      const { data } = await this.httpService.axiosRef.get<BandsResponse>(
        `${this.configService.get<string>(
          'BANDS_URL',
        )}?limit=${limit}&offset=${offset}`,
      );
      return await Promise.all(
        data.items.map(async (band) => {
          const genres = await this.getGenres(band.genresIds);
          return { ...band, id: band._id, genres: genres };
        }),
      );
    } catch (err) {
      console.log(err);
    }
  }

  async update(
    id: string,
    band: UpdateBandInput,
    token: string,
  ): Promise<Band> {
    try {
      const { data } = await this.httpService.axiosRef.put<BandResponse>(
        `${this.configService.get<string>('BANDS_URL')}/${id}`,
        band,
        { headers: { Authorization: `${token}` } },
      );
      if (data.genresIds) {
        const genres = await this.getGenres(data.genresIds);
        return { ...data, id: data._id, genres: genres };
      }
      return { ...data, id: data._id };
    } catch (err) {
      console.log(err);
    }
  }

  async remove(id: string, token: string) {
    try {
      await this.httpService.axiosRef.delete<Band>(
        `${this.configService.get<string>('BANDS_URL')}/${id}`,
        { headers: { Authorization: `${token}` } },
      );
      return true;
    } catch (err) {
      console.error(err);
    }
  }

  private async getGenres(genresArray: string[]) {
    return await Promise.all(
      genresArray.map((genre) => this.genresService.findOne(genre)),
    );
  }
}
