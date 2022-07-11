import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONTEXT } from '@nestjs/graphql';
import { IncomingMessage } from 'http';
import { FavouriteInput } from './dto/favourite.input';
import { Favourite } from './entities/favourite.entity';
import { FavouriteResponse } from './types/favouriteResponse.interface';

@Injectable()
export class FavouritesService {
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
    this.baseUrl = this.configService.get<string>('FAVOURITES_URL');
  }

  async create(favouriteInput: FavouriteInput): Promise<Favourite> {
    try {
      const { data } = await this.httpService.axiosRef.put<FavouriteResponse>(
        `${this.baseUrl}/add`,
        favouriteInput,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }

  async getAllFavourite(): Promise<Favourite> {
    try {
      const { data } = await this.httpService.axiosRef.get<FavouriteResponse>(
        this.baseUrl,
      );
      return data ? { ...data, id: data._id } : null;
    } catch (err) {
      console.error(err);
    }
  }
  async remove(favouriteInput: FavouriteInput): Promise<Favourite> {
    try {
      const { data } = await this.httpService.axiosRef.put<FavouriteResponse>(
        `${this.baseUrl}/remove`,
        favouriteInput,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }
}
