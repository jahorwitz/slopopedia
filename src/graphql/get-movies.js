import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query GetMovies($where: MovieWhereInput!) {
    movies(where: $where) {
      id
      title
      runtime
      releaseYear
      keywords {
        name
        id
      }
      description
      tomatoScore
      photo {
        url
      }
      howToWatch
      author {
        id
        isAdmin
        username
      }
      status
    }
  }
`;
