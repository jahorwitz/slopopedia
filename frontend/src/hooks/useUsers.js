import { gql, useQuery } from "@apollo/client";

export const useUsers = () => {
  return useQuery(gql`
    query GetUsers {
      users {
        id
        name
        email
      }
    }
  `);
};
