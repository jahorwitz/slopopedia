import { gql } from "@apollo/client";
export const CREATE_MOVIE = gql`
  mutation Mutation($data: MovieCreateInput!) {
    createMovie(data: $data) {
      author {
        id
        username
      }
      title
      description
      id
      keywords {
        name
      }
      photo {
        url
      }
    }
  }
`;

const all = {
  CREATE_MOVIE,
};

export default all;
