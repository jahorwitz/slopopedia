import { useQuery } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { GET_USER_AUTHENTICATION } from "../graphql/get-user-authentication";
import { Loading } from "./loading";

export function ProtectedRoute({ children }) {
  const { data, loading, error } = useQuery(GET_USER_AUTHENTICATION);

  if (loading) {
    return <Loading />;
  }

  if (error || !data?.authenticatedItem) {
    return <Navigate to="/" replace />;
  }

  return children;
}

ProtectedRoute.displayName = "ProtectedRoute";
