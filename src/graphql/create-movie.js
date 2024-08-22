import { gql } from "@apollo/client";
// export const CREATE_MOVIE = gql`
//   mutation Mutation($data: MovieCreateInput!) {
//     createMovie(data: $data) {
//       author {
//         id
//         username
//       }
//       title
//       description
//       releaseYear
//       runtime
//       id
//       keywords {
//         name
//       }
//       tomatoScore
//       photo {
//         url
//       }
//       howToWatch
//     }
//   }
// `;

export const CREATE_MOVIE = gql`
  mutation Mutation($data: MovieCreateInput!) {
    createMovie(data: $data) {
      id
      title
      runtime
      releaseYear
      keywords {
        id
        name
      }
      description
      tomatoScore
      photo {
        url
      }
      howToWatch
      author {
        id
        isAdmin
        username
      }
      status
    }
  }
`;
