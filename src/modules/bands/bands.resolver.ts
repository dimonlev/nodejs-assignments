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
import { Genre } from '../genres/entities/genre.entity';
import { GenresService } from '../genres/genres.service';
import { BandsService } from './bands.service';
import { CreateBandInput } from './dto/create-band.input';
import { UpdateBandInput } from './dto/update-band.input';
import { Band } from './entities/band.entity';
import { Member } from './entities/member.entity';
import { BandResponse } from './types/bandResponse.type';

@Resolver('Band')
export class BandsResolver {
  constructor(
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
  ) {}

  @Mutation('createBand')
  create(
    @Args('createBandInput') createBandInput: CreateBandInput,
    @Context() context,
  ): Promise<Band> {
    const token = context.req.headers.authorization;
    return this.bandsService.create(createBandInput, token);
  }

  @Query('bands')
  findAll(@Args() args: { limit: number; offset: number }): Promise<Band[]> {
    return this.bandsService.findAll(
      args.limit.toString(),
      args.offset.toString(),
    );
  }

  @ResolveField()
  async members(@Parent() band: BandResponse): Promise<Member[]> {
    const { members } = band;
    return (
      await Promise.all(
        members.map(async (member) => {
          return this.artistsService.findOne(member.id);
        }),
      )
    ).map((artist, index) => ({
      id: artist.id,
      firstName: artist.firstName,
      secondName: artist.secondName,
      middleName: artist.middleName,
      instrument: artist.instruments[0],
      years: members[index].years,
    }));
  }

  @ResolveField()
  async genres(@Parent() band: BandResponse): Promise<Genre[]> {
    const { genresIds } = band;
    return await Promise.all(
      genresIds.map((genre) => this.genresService.findOne(genre)),
    );
  }

  @Query('band')
  findOne(@Args('id') id: string) {
    return this.bandsService.findOne(id);
  }

  @Mutation('updateBand')
  update(
    @Args('updateBandInput') updateBandInput: UpdateBandInput,
    @Context() context,
  ) {
    const token = context.req.headers.authorization;
    return this.bandsService.update(updateBandInput.id, updateBandInput, token);
  }

  @Mutation('removeBand')
  remove(@Args('id') id: string, @Context() context) {
    const token = context.req.headers.authorization;
    return this.bandsService.remove(id, token);
  }
}
