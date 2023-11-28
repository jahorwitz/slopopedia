import { gql } from "@apollo/client";
// export const CREATE_POST = gql`
//   mutation Mutation($data: PostCreateInput!) {
//     createPost(data: $data) {
//       title
//       content
//       keywords {
//         name
//       }
//       movies {
//         title
//       }
//     }
//   }
// `;

export const CREATE_POST = gql`
  mutation Mutation($data: PostCreateInput!) {
    createPost(data: $data) {
      title
      content
      keywords {
        name
      }
      movies {
        title
        description
      }
    }
  }
`;

const all = {
  CREATE_POST,
};

export default all;
