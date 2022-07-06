import { HttpService } from '@nestjs/axios';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MemberExpression } from 'ts-morph';
import { ArtistsService } from '../artists/artists.service';
import { GenresService } from '../genres/genres.service';
import { CreateBandInput } from './dto/create-band.input';
import { UpdateBandInput } from './dto/update-band.input';
import { Band } from './entities/band.entity';
import { Member } from './entities/member.entity';
import { BandResponse } from './types/bandResponse.type';
import { BandsResponse } from './types/bandsResponse.type';

@Injectable()
export class BandsService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly genresService: GenresService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
  ) {}

  async create(band: CreateBandInput, token: string): Promise<Band> {
    try {
      const { data } = await this.httpService.axiosRef.post<BandResponse>(
        `${this.configService.get<string>('BANDS_URL')}`,
        band,
        { headers: { Authorization: `${token}` } },
      );
      const genres = await this.getGenres(data.genresIds);
      const members = await this.getMembers(data);
      return {
        ...data,
        id: data._id,
        genres: genres,
        members: [...members],
      };
    } catch (err) {
      console.log(err);
    }
  }

  async findOne(id: string): Promise<Band> {
    try {
      const { data } = await this.httpService.axiosRef.get<BandResponse>(
        `${this.configService.get<string>('BANDS_URL')}/${id}`,
      );
      const genres = await this.getGenres(data.genresIds);
      return { ...data, id: data._id, genres: genres };
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
      const genres = await this.getGenres(data.genresIds);
      const members = await this.getMembers(data);
      return {
        ...data,
        id: data._id,
        genres: genres,
        members: [...members],
      };
    } catch (err) {
      console.log(err);
    }
  }

  private async getMembers(band: BandResponse): Promise<Member[]> {
    const { members } = band;
    return (
      await Promise.all(
        members.map(async (member) => {
          return this.artistsService.findOne(member.id);
        }),
      )
    ).map((artist, index) => ({
      id: artist.id,
      firstName: artist.firstName,
      secondName: artist.secondName,
      middleName: artist.middleName,
      instrument: artist.instruments[0],
      years: members[index].years,
    }));
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
