import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation CreateBook($createBookInput: CreateBookInput!) {
    createBook(createBookInput: $createBookInput) {
      id
      title
      author
      publishedDate
      genre
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: String!, $updateBookInput: UpdateBookInput!) {
    updateBook(id: $id, updateBookInput: $updateBookInput) {
      id
      title
      author
      publishedDate
      genre
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: String!) {
    removeBook(id: $id)
  }
`;
