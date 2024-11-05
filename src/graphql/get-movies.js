import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query GetMovies(
    $where: MovieWhereInput!
    $whereUser: UserKeywordWhereInput!
  ) {
    movies(where: $where) {
      id
      title
      runtime
      releaseYear
      handicap
      keywords {
        name
        id
        userKeyword(where: $whereUser) {
          value
        }
      }
      description
      tomatoScore
      imageUrl
      howToWatch
      author {
        id
        isAdmin
        username
      }
      status
      handicap
    }
  }
`;

// By adding "take:" and "skip:" parameters to the gql query
// you can select certain subsections of movies you want to grab.
// Take is the size of the desired subsection while skip
// is the index that you want to take this subsection from.
export const GET_PAGINATED_MOVIES = gql`
  query GetPaginatedMovies($take: Int, $skip: Int, $where: MovieWhereInput) {
    movies(take: $take, skip: $skip, where: $where) {
      id
      title
      runtime
      releaseYear
      keywords {
        name
        id
      }
      description
      tomatoScore
      imageUrl
      howToWatch
      author {
        id
        isAdmin
        username
      }
      handicap
      status
    }
  }
`;

// knowing the total movie count helps the pagination mechanism keep track
// of where it is and when to stop requesting new movies from db
export const GET_MOVIES_COUNT = gql`
  query GetMoviesCount($where: MovieWhereInput) {
    moviesCount(where: $where)
  }
`;
