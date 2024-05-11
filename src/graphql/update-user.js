import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation Mutation($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateUser(where: $where, data: $data) {
      id
      email
      username
      password {
        isSet
      }
      watched {
        id
        title
      }
      wishlist {
        id
        title
      }
    }
  }
`;
