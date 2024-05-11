import { gql } from "@apollo/client";

//query to get data from users table including id, name, email
//used with apollo import useQuery() to fetch data from the database
//ex:
//const = {loading, error, data} = useQuery(GET_USERS);

export const GET_USERS = gql`
  query GetUsers($where: UserWhereInput!) {
    users(where: $where) {
      id
      username
      email
    }
  }
`;

// maybe consider connectiong user's session id
// for the current user
export const GET_USER = gql`
  query Query($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      username
      isAdmin
      email
    }
  }
`;

export const GET_USER_WATCHLIST = gql`
  query User($where: UserWhereUniqueInput!) {
    user(where: $where) {
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
