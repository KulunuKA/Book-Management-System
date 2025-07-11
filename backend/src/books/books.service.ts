import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  create(input: CreateBookInput): Book {
    const book = { id: uuidv4(), ...input };
    this.books.push(book);
    return book;
  }

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: string): Book {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    return book;
  }

  update(id: string, updateData: UpdateBookInput): Book {
    const book = this.findOne(id);
    Object.assign(book, updateData);
    return book;
  }

  remove(id: string): boolean {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) return false;
    this.books.splice(index, 1);
    return true;
  }
}
