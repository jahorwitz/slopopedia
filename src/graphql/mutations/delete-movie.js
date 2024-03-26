import { gql } from "@apollo/client";

export const DELETE_MOVIE = gql`
  mutation Mutation($where: MovieWhereUniqueInput!) {
    deleteMovie(where: $where) {
      title
    }
  }
`;
