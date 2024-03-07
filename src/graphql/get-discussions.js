import { gql } from "@apollo/client";

export const GET_DISCUSSIONS = gql`
  query Fest($where: FestWhereUniqueInput!) {
    fest(where: $where) {
      id
      festNotes {
        content
        createdAt
        id
        user {
          username
        }
        fest {
          id
        }
      }
    }
  }
`;
