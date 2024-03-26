import { gql } from "@apollo/client";

export const CREATE_FEST = gql`
  mutation CreateFest($data: FestCreateInput!) {
    createFest(data: $data) {
      name
      startDate
      endDate
      id
      invitees {
        username
      }
      creator {
        id
      }
    }
  }
`;
