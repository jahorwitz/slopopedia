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

export const GET_DRAFT_POSTS = gql`
  query Query {
    posts {
      title
      author {
        name
        createdAt
      }
    }
  }
`;

const all = {
  GET_BLOG_POSTS,
  GET_DRAFT_POSTS,
};

export default all;
