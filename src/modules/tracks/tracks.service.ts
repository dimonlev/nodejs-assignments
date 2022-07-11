import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONTEXT } from '@nestjs/graphql';
import { IncomingMessage } from 'http';
import { CreateTrackInput } from './dto/create-track.input';
import { UpdateTrackInput } from './dto/update-track.input';
import { Track } from './entities/track.entity';
import { TrackResponse } from './types/trackResponse.interface';
import { TracksResponse } from './types/tracksResponse.interface';

@Injectable()
export class TracksService {
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
    this.baseUrl = this.configService.get<string>('TRACKS_URL');
  }

  async create(createTrackInput: CreateTrackInput): Promise<Track> {
    try {
      const { data } = await this.httpService.axiosRef.post<TrackResponse>(
        this.baseUrl,
        createTrackInput,
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
        `${this.baseUrl}?limit=${limit}&offset=${offset}`,
      );
      return await data.items.map((artist) => {
        return { ...artist, id: artist._id };
      });
    } catch (err) {
      console.error(err);
    }
  }

  async findOne(id: string): Promise<Track> {
    try {
      const { data } = await this.httpService.axiosRef.get<TrackResponse>(
        `${this.baseUrl}/${id}`,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.log(err);
    }
  }

  async update(id: string, updateTrackInput: UpdateTrackInput): Promise<Track> {
    try {
      const { data } = await this.httpService.axiosRef.put<TrackResponse>(
        `${this.baseUrl}/${id}`,
        updateTrackInput,
      );
      return { ...data, id: data._id };
    } catch (err) {
      console.error(err);
    }
  }

  async remove(id: string) {
    try {
      await this.httpService.axiosRef.delete<Track>(`${this.baseUrl}/${id}`);
      return true;
    } catch (err) {
      console.error(err);
    }
  }
}
