import { forwardRef, Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ArtistsService } from '../artists/artists.service';
import { Artist } from '../artists/entities/artist.entity';
import { BandsService } from '../bands/bands.service';
import { Band } from '../bands/entities/band.entity';
import { Genre } from '../genres/entities/genre.entity';
import { GenresService } from '../genres/genres.service';
import { Track } from '../tracks/entities/track.entity';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from './albums.service';
import { CreateAlbumInput } from './dto/create-album.input';
import { UpdateAlbumInput } from './dto/update-album.input';
import { Album } from './entities/album.entity';
import { AlbumResponse } from './types/albumResponse.interface';

@Resolver('Album')
export class AlbumsResolver {
  constructor(
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    private readonly bandsService: BandsService,
    private readonly artistsService: ArtistsService,
    private readonly genresService: GenresService,
  ) {}

  @Mutation('createAlbum')
  create(
    @Args('createAlbumInput') createAlbumInput: CreateAlbumInput,
    @Context() context,
  ): Promise<Album> {
    const token = context.req.headers.authorization;
    return this.albumsService.create(createAlbumInput, token);
  }

  @ResolveField()
  async artists(@Parent() album: AlbumResponse): Promise<Artist[]> {
    const { artistsIds } = album;
    return await Promise.all(
      artistsIds.map((artist) => this.artistsService.findOne(artist)),
    );
  }

  @ResolveField()
  async bands(@Parent() album: AlbumResponse): Promise<Band[]> {
    const { bandsIds } = album;
    return await Promise.all(
      bandsIds.map((band) => this.bandsService.findOne(band)),
    );
  }

  @ResolveField()
  async tracks(@Parent() album: AlbumResponse): Promise<Track[]> {
    const { trackIds } = album;
    return await Promise.all(
      trackIds.map((track) => this.tracksService.findOne(track)),
    );
  }

  @ResolveField()
  async genres(@Parent() album: AlbumResponse): Promise<Genre[]> {
    const { genresIds } = album;
    return await Promise.all(
      genresIds.map((genre) => this.genresService.findOne(genre)),
    );
  }

  @Query('albums')
  findAll(@Args() args: { limit: number; offset: number }): Promise<Album[]> {
    return this.albumsService.findAll(
      args.limit.toString(),
      args.offset.toString(),
    );
  }
  @Query('album')
  findOne(@Args('id') id: string) {
    return this.albumsService.findOne(id);
  }

  @Mutation('updateAlbum')
  update(
    @Args('updateAlbumInput') updateAlbumInput: UpdateAlbumInput,
    @Context() context,
  ): Promise<Album> {
    const token = context.req.headers.authorization;
    return this.albumsService.update(
      updateAlbumInput.id,
      updateAlbumInput,
      token,
    );
  }

  @Mutation('removeAlbum')
  remove(@Args('id') id: string, @Context() context): Promise<Boolean> {
    const token = context.req.headers.authorization;
    return this.albumsService.remove(id, token);
  }
}
