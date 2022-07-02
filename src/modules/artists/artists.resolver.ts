import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';
import { Artist } from './entities/artist.entity';

@Resolver('Artist')
export class ArtistsResolver {
  constructor(private readonly artistsService: ArtistsService) {}

  @Mutation('createArtist')
  create(
    @Args('createArtistInput') createArtistInput: CreateArtistInput,
    @Context() context,
  ): Promise<Artist> {
    const token = context.req.headers.authorization;
    return this.artistsService.create(createArtistInput, token);
  }

  @Query('artists')
  findAll() {
    return this.artistsService.findAll();
  }

  @Query('artist')
  findOne(@Args('id') id: string) {
    return this.artistsService.findOne(id);
  }

  @Mutation('updateArtist')
  update(
    @Args('updateArtistInput') updateArtistInput: UpdateArtistInput,
    @Context() context,
  ) {
    const token = context.req.headers.authorization;
    return this.artistsService.update(
      updateArtistInput.id,
      updateArtistInput,
      token,
    );
  }

  @Mutation('removeArtist')
  remove(@Args('id') id: number, @Context() context) {
    const token = context.req.headers.authorization;
    return this.artistsService.remove(id, token);
  }
}
