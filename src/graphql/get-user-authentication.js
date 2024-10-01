import { gql } from "@apollo/client";

export const GET_USER_AUTHENTICATION = gql`
  query AuthenticatedItem {
    authenticatedItem {
      ... on User {
        username
        id
        email
        isAdmin
        wishlist {
          id
          title
          runtime
          releaseYear
          keywords {
            name
          }
          description
          tomatoScore
          imageUrl
          howToWatch
          handicap
        }
        wishlistCount
        watched {
          id
          title
          runtime
          releaseYear
          keywords {
            name
          }
          description
          tomatoScore
          imageUrl
          howToWatch
          handicap
        }
        watchedCount
      }
    }
  }
`;
