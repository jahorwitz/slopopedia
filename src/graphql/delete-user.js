import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation Mutation($where: UserWhereUniqueInput!) {
    deleteUser(where: $where) {
      id
    }
  }
`;
