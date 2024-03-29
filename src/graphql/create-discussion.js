import { gql } from "@apollo/client";

export const CREATE_DISCUSSION = gql`
  mutation Mutation($data: FestNoteCreateInput!) {
    createFestNote(data: $data) {
      createdAt
      fest {
        id
      }
      user {
        id
      }
      content
    }
  }
`;
