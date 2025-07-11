import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty({ message: 'Email is required' })
  @Length(5, 50, { message: 'Email must be between 5 and 50 characters' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;
}
