import { gql } from "@apollo/client";

export const GET_BLOG_POSTS = gql`
  query Query {
    posts {
      title
      content
      author {
        username
        createdAt
      }
    }
  }
`;

export const GET_DRAFT_POSTS = gql`
  query Query {
    posts {
      title
      author {
        username
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
