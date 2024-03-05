import { gql } from "@apollo/client";

export const UPDATE_FEST = gql`
  mutation UpdateFest($where: FestWhereUniqueInput!, $data: FestUpdateInput!) {
    updateFest(where: $where, data: $data) {
      creator {
        id
      }
      id
      name
      startDate
      endDate
      attendees {
        username
      }
    }
  }
`;
