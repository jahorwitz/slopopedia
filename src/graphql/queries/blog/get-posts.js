import { gql } from "@apollo/client";

export const GET_BLOG_POSTS = gql`
  query Query {
    posts {
      title
      content {
        document
      }
      author {
        name
        createdAt
      }
      id
      status
    }
  }
`;

const all = {
  GET_BLOG_POSTS,
};

export default all;
