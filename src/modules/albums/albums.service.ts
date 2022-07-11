import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONTEXT } from '@nestjs/graphql';
import { IncomingMessage } from 'http';
import { CreateAlbumInput } from './dto/create-album.input';
import { UpdateAlbumInput } from './dto/update-album.input';
import { Album } from './entities/album.entity';
import { AlbumResponse } from './types/albumResponse.interface';
import { AlbumsResponse } from './types/albumsResponse.interface';

@Injectable()
export class AlbumsService {
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
    this.baseUrl = this.configService.get<string>('ALBUMS_URL');
  }

  async create(createAlbumInput: CreateAlbumInput): Promise<Album> {
    try {
      const { data } = await this.httpService.axiosRef.post<AlbumResponse>(
        this.baseUrl,
        createAlbumInput,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }

  async findAll(limit: string, offset: string): Promise<Album[]> {
    try {
      const { data } = await this.httpService.axiosRef.get<AlbumsResponse>(
        `${this.baseUrl}?limit=${limit}&offset=${offset}`,
      );
      return data.items.map((artist) => {
        return { ...artist, id: artist._id };
      });
    } catch (err) {
      console.error(err);
    }
  }

  async findOne(id: string): Promise<Album> {
    try {
      const { data } = await this.httpService.axiosRef.get<AlbumResponse>(
        `${this.baseUrl}/${id}`,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }

  async update(id: string, updateAlbumInput: UpdateAlbumInput): Promise<Album> {
    try {
      const { data } = await this.httpService.axiosRef.put<AlbumResponse>(
        `${this.baseUrl}/${id}`,
        updateAlbumInput,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }

  async remove(id: string) {
    try {
      await this.httpService.axiosRef.delete<Album>(`${this.baseUrl}/${id}`);
      return true;
    } catch (err) {
      console.error(err);
    }
  }
}
