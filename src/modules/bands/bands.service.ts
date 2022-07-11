import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONTEXT } from '@nestjs/graphql';
import { IncomingMessage } from 'http';
import { CreateBandInput } from './dto/create-band.input';
import { UpdateBandInput } from './dto/update-band.input';
import { Band } from './entities/band.entity';
import { BandResponse } from './types/bandResponse.type';
import { BandsResponse } from './types/bandsResponse.type';

@Injectable()
export class BandsService {
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
    this.baseUrl = this.configService.get<string>('BANDS_URL');
  }

  async create(createBandInput: CreateBandInput): Promise<Band> {
    try {
      const { data } = await this.httpService.axiosRef.post<BandResponse>(
        this.baseUrl,
        createBandInput,
      );
      return {
        ...data,
        id: data._id,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async findOne(id: string): Promise<Band> {
    try {
      const { data } = await this.httpService.axiosRef.get<BandResponse>(
        `${this.baseUrl}/${id}`,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.log(err);
    }
  }

  async findAll(limit: string, offset: string): Promise<Band[]> {
    try {
      const { data } = await this.httpService.axiosRef.get<BandsResponse>(
        `${this.baseUrl}?limit=${limit}&offset=${offset}`,
      );
      return data.items.map((band) => {
        return { ...band, id: band._id };
      });
    } catch (err) {
      console.log(err);
    }
  }

  async update(id: string, updateBandInput: UpdateBandInput): Promise<Band> {
    try {
      const { data } = await this.httpService.axiosRef.put<BandResponse>(
        `${this.baseUrl}/${id}`,
        updateBandInput,
      );
      return {
        ...data,
        id: data._id,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async remove(id: string) {
    try {
      await this.httpService.axiosRef.delete<Band>(`${this.baseUrl}/${id}`);
      return true;
    } catch (err) {
      console.error(err);
    }
  }
}
