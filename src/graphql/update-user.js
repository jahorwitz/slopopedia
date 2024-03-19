import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation Mutation($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateUser(where: $where, data: $data) {
      email
      username
      password {
        isSet
      }
    }
  }
`;
