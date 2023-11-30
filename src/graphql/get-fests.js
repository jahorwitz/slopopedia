import { gql } from "@apollo/client";

export const GET_FESTS = gql`
  query GetFests {
    fests {
      id
      name
    }
  }
`;
