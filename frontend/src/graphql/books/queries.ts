import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query {
    books {
      id
      title
      author
      publishedDate
      genre
    }
  }
`;

export const GET_BOOK_BY_ID = gql`
  query GetBook($id: String!) {
    book(id: $id) {
      id
      title
      author
      publishedDate
      genre
    }
  }
`;


export const SEARCH_BOOKS = gql`
  query SearchBooks($searchTerm: String!) {
    searchBook(searchTerm: $searchTerm) {
      id
      title
      author
      publishedDate
      genre
    }
  }
`;
