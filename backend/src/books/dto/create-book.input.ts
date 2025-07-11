import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @Field()
  @IsNotEmpty({ message: 'Author is required' })
  author: string;

  @Field()
  @IsNotEmpty({ message: 'Published date is required' })
  publishedDate: string;

  @Field()
  @IsNotEmpty({ message: 'Genre is required' })
  genre: string;
}
