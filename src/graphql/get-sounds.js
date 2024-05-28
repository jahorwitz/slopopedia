import { gql } from "@apollo/client";

export const GET_SOUNDS = gql`
  query GetMovies($where: SoundWhereInput!) {
    sounds(where: $where) {
      id
      title
      photo {
        url
      }
      audio
    }
  }
`;
