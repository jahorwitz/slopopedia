import { gql } from "@apollo/client";

export const GET_USER_FESTS = gql`
  query Fests($where: FestWhereInput!) {
    fests(where: $where) {
      startDate
      endDate
      attendees {
        username
        id
      }
      invitees {
        username
        id
      }
      name
      id
    }
  }
`;
