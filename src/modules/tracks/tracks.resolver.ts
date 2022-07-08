import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TracksService } from './tracks.service';
import { CreateTrackInput } from './dto/create-track.input';
import { UpdateTrackInput } from './dto/update-track.input';
import { Track } from './entities/track.entity';
import { TrackResponse } from './types/trackResponse.interface';
import { Artist } from '../artists/entities/artist.entity';
import { ArtistsService } from '../artists/artists.service';
import { Band } from '../bands/entities/band.entity';
import { BandsService } from '../bands/bands.service';
import { GenresService } from '../genres/genres.service';
import { Genre } from '../genres/entities/genre.entity';
import { AlbumsService } from '../albums/albums.service';
import { Album } from '../albums/entities/album.entity';
import { forwardRef, Inject } from '@nestjs/common';

@Resolver('Track')
export class TracksResolver {
  constructor(
    private readonly tracksService: TracksService,
    private readonly artistsService: ArtistsService,
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
  ) {}

  @Mutation('createTrack')
  create(
    @Args('createTrackInput') createTrackInput: CreateTrackInput,
    @Context() context,
  ): Promise<Track> {
    const token = context.req.headers.authorization;
    return this.tracksService.create(createTrackInput, token);
  }

  @ResolveField()
  async artists(@Parent() track: TrackResponse): Promise<Artist[]> {
    const { artistsIds } = track;
    return await Promise.all(
      artistsIds.map((artist) => this.artistsService.findOne(artist)),
    );
  }

  @ResolveField()
  async bands(@Parent() track: TrackResponse): Promise<Band[]> {
    const { bandsIds } = track;
    return await Promise.all(
      bandsIds.map((band) => this.bandsService.findOne(band)),
    );
  }

  @ResolveField()
  async genres(@Parent() track: TrackResponse): Promise<Genre[]> {
    const { genresIds } = track;
    return await Promise.all(
      genresIds.map((genre) => this.genresService.findOne(genre)),
    );
  }

  @ResolveField()
  async album(@Parent() track: TrackResponse): Promise<Album> {
    const { albumId } = track;
    return await this.albumsService.findOne(albumId);
  }

  @Query('tracks')
  findAll(@Args() args: { limit: number; offset: number }): Promise<Track[]> {
    return this.tracksService.findAll(
      args.limit.toString(),
      args.offset.toString(),
    );
  }

  @Query('track')
  findOne(@Args('id') id: string) {
    return this.tracksService.findOne(id);
  }

  @Mutation('updateTrack')
  update(
    @Args('updateTrackInput') updateTrackInput: UpdateTrackInput,
    @Context() context,
  ): Promise<Track> {
    const token = context.req.headers.authorization;
    return this.tracksService.update(
      updateTrackInput.id,
      updateTrackInput,
      token,
    );
  }

  @Mutation('removeTrack')
  remove(@Args('id') id: string, @Context() context): Promise<Boolean> {
    const token = context.req.headers.authorization;
    return this.tracksService.remove(id, token);
  }
}
