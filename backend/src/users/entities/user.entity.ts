import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
