import { useQuery } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { GET_USER_AUTHENTICATION } from "../graphql";
import { Loading } from "./loading";

export function IdProtectedRoute({
  allowedUserIdsLoading = false,
  allowedUserIds = [],
  children,
}) {
  const {
    data,
    loading: isUserLoading,
    error,
  } = useQuery(GET_USER_AUTHENTICATION);
  const hasPermission = allowedUserIds.includes(data.authenticatedItem.id);

  if (isUserLoading || allowedUserIdsLoading) {
    return <Loading />;
  }

  if (error || !data?.authenticatedItem || !hasPermission) {
    return <Navigate to="/" replace />;
  }

  return children;
}
