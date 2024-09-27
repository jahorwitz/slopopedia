import { gql } from "@apollo/client";

export const EDIT_MOVIE = gql`
  mutation editMovie($where: MovieWhereUniqueInput!, $data: MovieUpdateInput!) {
    updateMovie(where: $where, data: $data) {
      title
      description
      howToWatch
      keywords {
        name
      }
      imageUrl
      releaseYear
      runtime
      tomatoScore
    }
  }
`;
