import { gql } from "@apollo/client";

export const GET_USER_AUTHENTICATION = gql`
  query AuthenticatedItem {
    authenticatedItem {
      ... on User {
        username
        id
        email
      }
    }
  }
`;
