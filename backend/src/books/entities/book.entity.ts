import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@ObjectType()
export class Book {
  @Field(() => ID)
  id: string;

  @Field()
  @IsNotEmpty({ message: 'Title is required' })
  @Length(2, 100, { message: 'Title must be between 2 and 100 characters' })
  title: string;

  @Field()
  @IsNotEmpty({ message: 'Author is required' })
  @Length(2, 50, { message: 'Author name must be between 2 and 50 characters' })
  author: string;

  @Field()
  @IsNotEmpty({ message: 'Published date is required' })
  publishedDate: string;

  @Field()
  @IsNotEmpty({ message: 'Genre is required' })
  genre: string;
}
