import { gql } from "@apollo/client";
export const CREATE_MOVIE = gql`
  mutation Mutation($data: MovieCreateInput!) {
    createMovie(data: $data) {
      author {
        id
        username
      }
      title
      description
      releaseYear
      runtime
      id
      keywords {
        name
      }
      tomatoScore
      photo {
        url
      }
      howToWatch
    }
  }
`;
