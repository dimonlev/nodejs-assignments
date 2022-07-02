import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { BandsService } from './bands.service';
import { CreateBandInput } from './dto/create-band.input';
import { UpdateBandInput } from './dto/update-band.input';
import { Band } from './entities/band.entity';

@Resolver('Band')
export class BandsResolver {
  constructor(private readonly bandsService: BandsService) {}

  @Mutation('createBand')
  create(
    @Args('createBandInput') createBandInput: CreateBandInput,
    @Context() context,
  ): Promise<Band> {
    const token = context.req.headers.authorization;
    return this.bandsService.create(createBandInput, token);
  }

  @Query('bands')
  findAll() {
    return this.bandsService.findAll();
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
  remove(@Args('id') id: string) {
    return this.bandsService.remove(id);
  }
}
