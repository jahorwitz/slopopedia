import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation Mutation($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateUser(where: $where, data: $data) {
      id
      email
      username
      password {
        isSet
      }
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
        photo {
          url
        }
        howToWatch
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
        photo {
          url
        }
        howToWatch
      }
      watchedCount
    }
  }
`;
