import { gql } from "@apollo/client";

export const GET_DISCUSSION = gql`
  query Fest($where: FestWhereUniqueInput!) {
    fest(where: $where) {
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
