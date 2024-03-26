import { gql } from "@apollo/client";

export const DELETE_FEST = gql`
  mutation DeleteFest($where: FestWhereUniqueInput!) {
    deleteFest(where: $where) {
      id
    }
  }
`;
