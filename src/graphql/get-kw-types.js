import { gql } from "@apollo/client";

export const GET_KW_TYPES = gql`
  query Query {
    keywordTypes {
      id
      name
      keywords {
        id
        name
        handicap
      }
    }
  }
`;
