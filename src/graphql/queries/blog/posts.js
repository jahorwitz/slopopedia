import { gql } from "@apollo/client";

export const GET_BLOG_POSTS = gql`
  query Query($where: PostWhereInput!) {
    posts(where: $where) {
      title
      content
      author {
        username
        id
      }
      id
      keywords {
        name
        id
      }
      movies {
        title
        description
        id
      }
      createdAt
      status
    }
  }
`;

export const GET_BLOG_POST = gql`
  query Query($where: PostWhereUniqueInput!) {
    post(where: $where) {
      title
      content
      author {
        username
        id
      }
      keywords {
        name
        id
      }
      movies {
        title
        description
        id
      }
      createdAt
      status
    }
  }
`;

export const GET_DRAFT_POSTS = gql`
  query Query($where: PostWhereInput!) {
    posts(where: $where) {
      title
      author {
        username
        id
      }
      keywords {
        name
        id
      }
      movies {
        title
        description
        id
      }
      createdAt
      id
      status
    }
  }
`;

const all = {
  GET_BLOG_POSTS,
  GET_BLOG_POST,
  GET_DRAFT_POSTS,
};

export default all;
