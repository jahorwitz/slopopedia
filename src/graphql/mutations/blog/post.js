import { gql } from "@apollo/client";
export const CREATE_POST = gql`
  mutation Mutation($data: PostCreateInput!) {
    createPost(data: $data) {
      title
      content {
        document
      }
    }
  }
`;

const all = {
  CREATE_POST,
};

export default all;
