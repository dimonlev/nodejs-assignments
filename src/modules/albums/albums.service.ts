import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateAlbumInput } from './dto/create-album.input';
import { UpdateAlbumInput } from './dto/update-album.input';
import { Album } from './entities/album.entity';
import { AlbumResponse } from './types/albumResponse.interface';
import { AlbumsResponse } from './types/albumsResponse.interface';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async create(
    createAlbumInput: CreateAlbumInput,
    token: string,
  ): Promise<Album> {
    try {
      const { data } = await this.httpService.axiosRef.post<AlbumResponse>(
        `${this.configService.get<string>('ALBUMS_URL')}`,
        createAlbumInput,
        { headers: { Authorization: `${token}` } },
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }

  async findAll(limit: string, offset: string): Promise<Album[]> {
    try {
      const { data } = await this.httpService.axiosRef.get<AlbumsResponse>(
        `${this.configService.get<string>(
          'ALBUMS_URL',
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

  async findOne(id: string): Promise<Album> {
    try {
      const { data } = await this.httpService.axiosRef.get<AlbumResponse>(
        `${this.configService.get<string>('ALBUMS_URL')}/${id}`,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }

  async update(
    id: string,
    updateAlbumInput: UpdateAlbumInput,
    token: string,
  ): Promise<Album> {
    try {
      const { data } = await this.httpService.axiosRef.put<AlbumResponse>(
        `${this.configService.get<string>('ALBUMS_URL')}/${id}`,
        updateAlbumInput,
        { headers: { Authorization: `${token}` } },
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }

  async remove(id: string, token: string) {
    try {
      await this.httpService.axiosRef.delete<Album>(
        `${this.configService.get<string>('ALBUMS_URL')}/${id}`,
        { headers: { Authorization: `${token}` } },
      );
      return true;
    } catch (err) {
      console.error(err);
    }
  }
}
