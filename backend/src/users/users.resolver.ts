import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { AuthPayload } from './entities/authPayload.entity';

@Resolver(() => AuthPayload)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => AuthPayload)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => AuthPayload)
  loginUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.login(createUserInput);
  }
}
