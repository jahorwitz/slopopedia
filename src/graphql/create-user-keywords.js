import { gql } from "@apollo/client";

export const CREATE_USER_KEYWORD = gql`
  mutation CreateUserKeyword($data: UserKeywordCreateInput!) {
    createUserKeyword(data: $data) {
      user {
        id
      }
      keyword {
        name
      }
      value
    }
  }
`;
