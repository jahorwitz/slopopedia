import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/get-users.js";

export const useCurrentUser = () => {
  const user = useQuery(GET_USER);
  if (user) {
    return {
      ...user,
      // check for admin role here
    };
  }
  return null;
};
