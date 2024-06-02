import { gql } from "@apollo/client";

export const GET_SOUNDS = gql`
  query GetSounds {
    sounds {
      id
      title
      photo {
        url
      }
      audio
    }
  }
`;
