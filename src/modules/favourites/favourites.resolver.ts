import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { FavouritesService } from './favourites.service';
import { FavouriteInput } from './dto/favourite.input';
import { TracksService } from '../tracks/tracks.service';
import { BandsService } from '../bands/bands.service';
import { ArtistsService } from '../artists/artists.service';
import { GenresService } from '../genres/genres.service';
import { Artist } from '../artists/entities/artist.entity';
import { Band } from '../bands/entities/band.entity';
import { Track } from '../tracks/entities/track.entity';
import { Genre } from '../genres/entities/genre.entity';
import { FavouriteResponse } from './types/favouriteResponse.interface';
import { Favourite } from './entities/favourite.entity';

@Resolver('Favourite')
export class FavouritesResolver {
  constructor(
    private readonly favouritesService: FavouritesService,
    private readonly tracksService: TracksService,
    private readonly bandsService: BandsService,
    private readonly artistsService: ArtistsService,
    private readonly genresService: GenresService,
  ) {}

  @Mutation('addToFavourite')
  create(
    @Args('favouriteInput') favouriteInput: FavouriteInput,
  ): Promise<Favourite> {
    return this.favouritesService.create(favouriteInput);
  }

  @Query('favourites')
  async findAll(): Promise<Favourite> {
    return await this.favouritesService.getAllFavourite();
  }

  @Mutation('removeFromFavourite')
  remove(
    @Args('favouriteInput') favouriteInput: FavouriteInput,
  ): Promise<Favourite> {
    return this.favouritesService.remove(favouriteInput);
  }

  @ResolveField()
  async artists(@Parent() favourite: FavouriteResponse): Promise<Artist[]> {
    const { artistsIds } = favourite;
    return artistsIds
      ? Promise.all(artistsIds.map((id) => this.artistsService.findOne(id)))
      : null;
  }

  @ResolveField()
  async bands(@Parent() favourite: FavouriteResponse): Promise<Band[]> {
    const { bandsIds } = favourite;
    return bandsIds
      ? Promise.all(bandsIds.map((id) => this.bandsService.findOne(id)))
      : null;
  }

  @ResolveField()
  async tracks(@Parent() favourite: FavouriteResponse): Promise<Track[]> {
    const { tracksIds } = favourite;
    return tracksIds
      ? Promise.all(tracksIds.map((id) => this.tracksService.findOne(id)))
      : null;
  }

  @ResolveField()
  async genres(@Parent() favourite: FavouriteResponse): Promise<Genre[]> {
    const { genresIds } = favourite;
    return genresIds
      ? Promise.all(genresIds.map((id) => this.genresService.findOne(id)))
      : null;
  }
}
