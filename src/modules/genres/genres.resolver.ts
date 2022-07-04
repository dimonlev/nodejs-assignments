import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { GenresService } from './genres.service';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';

@Resolver('Genre')
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @Mutation('createGenre')
  create(
    @Args('createGenreInput') createGenreInput: CreateGenreInput,
    @Context() context,
  ) {
    const token = context.req.headers.authorization;
    return this.genresService.create(createGenreInput, token);
  }

  @Query('genres')
  findAll(@Args() args: { limit: number; offset: number }) {
    return this.genresService.findAll(
      args.limit.toString(),
      args.offset.toString(),
    );
  }

  @Query('genre')
  findOne(@Args('id') id: string) {
    return this.genresService.findOne(id);
  }

  @Mutation('updateGenre')
  update(
    @Args('updateGenreInput') updateGenreInput: UpdateGenreInput,
    @Context() context,
  ) {
    const token = context.req.headers.authorization;
    return this.genresService.update(
      updateGenreInput.id,
      updateGenreInput,
      token,
    );
  }

  @Mutation('removeGenre')
  remove(@Args('id') id: string, @Context() context) {
    const token = context.req.headers.authorization;
    return this.genresService.remove(id, token);
  }
}
