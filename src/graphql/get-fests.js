import { gql } from "@apollo/client";

export const GET_FESTS = gql`
  query Query($where: FestWhereInput!) {
    fests(where: $where) {
      name
      id
      startDate
      endDate
      creator {
        id
      }
      attendees {
        id
      }
      invitees {
        id
      }
    }
  }
`;
