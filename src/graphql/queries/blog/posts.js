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
      }
      movies {
        title
        description
      }
      createdAt
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
      }
      movies {
        title
        description
      }
      createdAt
      status
    }
  }
`;

export const GET_KEYWORDS = gql`
  query Query {
    keywords {
      id
      name
    }
  }
`;

export const GET_MOVIES = gql`
  query Query {
    movies {
      id
      title
    }
  }
`;

export const GET_DRAFT_POSTS = gql`
  query Query($where: PostWhereInput!) {
    posts(where: $where) {
      title
      author {
        username
      }
      createdAt
      id
    }
  }
`;

const all = {
  GET_BLOG_POSTS,
  GET_BLOG_POST,
  GET_DRAFT_POSTS,
  GET_KEYWORDS,
  GET_MOVIES,
};

export default all;
