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
        id
      }
      movies {
        title
        description
        id
      }
      author {
        username
        id
      }
      createdAt
      status
    }
  }
`;

export const DELETE_POST = gql`
  mutation Mutation($where: PostWhereUniqueInput!) {
    deletePost(where: $where) {
      id
    }
  }
`;

export const MODIFY_POST = gql`
  mutation ModifyPost($where: PostWhereUniqueInput!, $data: PostUpdateInput!) {
    updatePost(where: $where, data: $data) {
      id
      title
      content
      keywords {
        name
        id
      }
      movies {
        title
        description
        id
      }
      author {
        username
        id
      }
      createdAt
      status
    }
  }
`;
