import { Redirect, Route } from "react-router-dom";

export function ProtectedRoute({ children, ...props }) {
  return (
    <Route {...props}>{isLoggedIn ? children : <Redirect to="/" />}</Route>
  );
}
