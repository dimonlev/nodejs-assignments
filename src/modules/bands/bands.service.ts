import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateBandInput } from './dto/create-band.input';
import { UpdateBandInput } from './dto/update-band.input';
import { Band } from './entities/band.entity';

@Injectable()
export class BandsService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async create(band: CreateBandInput, token: string): Promise<Band> {
    try {
      const { data } = await this.httpService.axiosRef.post<BandResponse>(
        `${this.configService.get<string>('BANDS_URL')}`,
        band,
        { headers: { Authorization: `${token}` } },
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.log(err);
    }
  }

  findAll() {
    return `This action returns all bands`;
  }

  findOne(id: string) {
    return `This action returns a #${id} band`;
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
      return { ...data, id: data._id };
    } catch (err) {
      console.log(err);
    }
  }

  remove(id: string) {
    return `This action removes a #${id} band`;
  }
}
