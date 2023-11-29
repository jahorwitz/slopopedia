import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      email
      id
      username
    }
  }
`;
