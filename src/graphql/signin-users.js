import { gql } from "@apollo/client";

export const SIGNIN = gql`
  mutation AuthenticateUserWithPassword(
    $username: String!
    $password: String!
  ) {
    authenticateUserWithPassword(username: $username, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          email
          id
          username
          isAdmin
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;
