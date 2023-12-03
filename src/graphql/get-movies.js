import { gql } from "@apollo/client";

//query to get data from users table including id, name, email
//used with apollo import useQuery() to fetch data from the database
//ex:
//const = {loading, error, data} = useQuery(GET_USERS);

export const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
      releaseYear
      runtime
      photo {
        id
        url
      }
      keywords {
        id
        name
      }
    }
  }
`;
