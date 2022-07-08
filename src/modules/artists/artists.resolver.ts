import { forwardRef, Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  Info,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BandsService } from '../bands/bands.service';
import { Band } from '../bands/entities/band.entity';
import { ArtistsService } from './artists.service';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';
import { Artist } from './entities/artist.entity';
import { ArtistResponse } from './types/artistResponse.type';

@Resolver('Artist')
export class ArtistsResolver {
  constructor(
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => BandsService))
    private readonly bandsService: BandsService,
  ) {}

  @Mutation('createArtist')
  create(
    @Args('createArtistInput') createArtistInput: CreateArtistInput,
    @Context() context,
  ): Promise<Artist> {
    const token = context.req.headers.authorization;
    return this.artistsService.create(createArtistInput, token);
  }

  @Query('artists')
  findAll(@Args() args: { limit: number; offset: number }): Promise<Artist[]> {
    return this.artistsService.findAll(
      args.limit.toString(),
      args.offset.toString(),
    );
  }

  @Query('artist')
  findOne(@Args('id') id: string): Promise<Artist> {
    return this.artistsService.findOne(id);
  }

  @ResolveField()
  async bands(@Parent() artist: ArtistResponse): Promise<Band[]> {
    const { bandsIds } = artist;
    return await Promise.all(
      bandsIds.map((id: string) => this.bandsService.findOne(id)),
    );
  }

  @Mutation('updateArtist')
  update(
    @Args('updateArtistInput') updateArtistInput: UpdateArtistInput,
    @Context() context,
  ): Promise<Artist> {
    const token = context.req.headers.authorization;
    return this.artistsService.update(
      updateArtistInput.id,
      updateArtistInput,
      token,
    );
  }

  @Mutation('removeArtist')
  remove(@Args('id') id: number, @Context() context): Promise<Boolean> {
    const token = context.req.headers.authorization;
    return this.artistsService.remove(id, token);
  }
}
