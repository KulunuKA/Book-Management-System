import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';
import { BooksService } from './books.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateBookInput } from './dto/create-book.input';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => [Book])
  books() {
    return this.booksService.findAll();
  }

  @Query(() => Book, { nullable: true })
  book(@Args('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Mutation(() => Book)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return this.booksService.create(createBookInput);
  }

  @Mutation(() => Book)
  updateBook(
    @Args('id') id: string,
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
  ) {
    return this.booksService.update(id, updateBookInput);
  }

  @Mutation(() => Boolean)
  removeBook(@Args('id') id: string) {
    return this.booksService.remove(id);
  }

  @Query(() => [Book])
  searchBook(@Args('searchTerm') searchTerm: string) {
    return this.booksService.search(searchTerm);
  }
}
