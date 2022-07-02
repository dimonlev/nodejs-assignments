import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRequest } from './types/userRequestToken.entity';
import { User } from './entities/user.entity';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('register')
  create(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query('user')
  findOne(@Args('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Query('jwt')
  getToken(@Args('user') user: UserRequest) {
    return this.usersService.getToken(user);
  }
}
