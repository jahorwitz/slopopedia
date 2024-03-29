import { gql } from "@apollo/client";

export const UPDATE_MOVIE_STATUS = gql`
  mutation Mutation($where: MovieWhereUniqueInput!, $data: MovieUpdateInput!) {
    updateMovie(where: $where, data: $data) {
      id
      status
      title
    }
  }
`;
