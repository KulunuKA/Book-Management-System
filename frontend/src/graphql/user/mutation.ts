import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($createUserInput: CreateUserInput!) {
    loginUser(createUserInput: $createUserInput) {
      token
      user {
        id
        email
      }
    }
  }
`;
