import { gql } from "@apollo/client";

//pass in empty object for where to get all movies
//variables: {
//  where: {},
// },
export const GET_MOVIES = gql`
  query GetMovies($where: MovieWhereInput!) {
    movies(where: $where) {
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
      author {
        id
      }
      status
    }
  }
`;
