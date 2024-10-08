import { gql } from "@apollo/client";

export const GET_MOVIE = gql`
  query GetMovieById($where: MovieWhereUniqueInput!) {
    movie(where: $where) {
      id
      title
      description
      releaseYear
      runtime
      tomatoScore
      howToWatch
      imageUrl
      keywords {
        name
        id
      }
    }
  }
`;
