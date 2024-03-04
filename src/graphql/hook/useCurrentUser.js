import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { GET_USER } from "../../graphql/get-users.js";
import { CurrentUserContext } from "../../store/current-user-context.js";

export const useCurrentUser = () => {
  const { currentUser } = useContext(CurrentUserContext);

  const userId = currentUser?.id;

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { where: { id: userId } },
    skip: !userId,
  });

  if (loading) return { loading };
  if (error) return { error };
  if (data && data.user) {
    return {
      ...data.user,
      isAdmin: data.user.isAdmin,
    };
  }
  return null;
};
