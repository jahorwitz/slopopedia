import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser($data: [UserUpdateArgs!]!) {
    updateUser($data: data) {
        email
        username
        password {
            isSet
        }
    }
  }
`;
