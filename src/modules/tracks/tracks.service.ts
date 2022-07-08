import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateTrackInput } from './dto/create-track.input';
import { UpdateTrackInput } from './dto/update-track.input';
import { Track } from './entities/track.entity';
import { TrackResponse } from './types/trackResponse.interface';
import { TracksResponse } from './types/tracksResponse.interface';

@Injectable()
export class TracksService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async create(
    createTrackInput: CreateTrackInput,
    token: string,
  ): Promise<Track> {
    try {
      const { data } = await this.httpService.axiosRef.post<TrackResponse>(
        `${this.configService.get<string>('TRACKS_URL')}`,
        createTrackInput,
        { headers: { Authorization: `${token}` } },
      );
      return {
        ...data,
        id: data._id,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async findAll(limit: string, offset: string): Promise<Track[]> {
    try {
      const { data } = await this.httpService.axiosRef.get<TracksResponse>(
        `${this.configService.get<string>(
          'TRACKS_URL',
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

  async findOne(id: string): Promise<Track> {
    try {
      const { data } = await this.httpService.axiosRef.get<TrackResponse>(
        `${this.configService.get<string>('TRACKS_URL')}/${id}`,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.log(err);
    }
  }

  async update(
    id: string,
    updateTrackInput: UpdateTrackInput,
    token: string,
  ): Promise<Track> {
    try {
      const { data } = await this.httpService.axiosRef.put<TrackResponse>(
        `${this.configService.get<string>('TRACKS_URL')}/${id}`,
        updateTrackInput,
        { headers: { Authorization: `${token}` } },
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }

  async remove(id: string, token: string) {
    try {
      await this.httpService.axiosRef.delete<Track>(
        `${this.configService.get<string>('TRACKS_URL')}/${id}`,
        { headers: { Authorization: `${token}` } },
      );
      return true;
    } catch (err) {
      console.error(err);
    }
  }
}
