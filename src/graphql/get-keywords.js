import { gql } from "@apollo/client";

export const GET_KEYWORDS = gql`
  query Query {
    keywords {
      name
      id
    }
  }
`;
