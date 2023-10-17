import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/global/default.css";
import { ProtectedRoute, Submit, SubmitList } from "./components/index";
import {
  BrowseRoute,
  FestsRoute,
  MainRoute,
  MovieRoute,
  SearchRoute,
  SoundsRoute,
} from "./routes";

const client = new ApolloClient({
  uri:
    //in Vite, use special object `import.meta.env` to access enviroment variables
    import.meta.env.MODE === "production"
      ? //created environment variables must be prefixed by VITE
        import.meta.env.VITE_API_URI
      : "http://localhost:8080/api/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainRoute />} />
          <Route path="/browse" element={<BrowseRoute />} />
          <Route path="/browse" element={<FestsRoute />} />
          <Route path="/browse" element={<MovieRoute />} />
          <Route path="/browse" element={<SearchRoute />} />
          <Route path="/browse" element={<SoundsRoute />} />
          <Route
            path="/profile-settings"
            element={<ProtectedRoute>{/* <Profile /> */}</ProtectedRoute>}
          />
          <Route
            path="/preferences"
            element={<ProtectedRoute>{/* <Preferences /> */}</ProtectedRoute>}
          />
          <Route
            path="/submit"
            element={<ProtectedRoute>{<Submit />}</ProtectedRoute>}
          />
          <Route
            path="/submit-list"
            element={<ProtectedRoute>{<SubmitList />}</ProtectedRoute>}
          />
          <Route
            path="/recommend"
            element={<ProtectedRoute>{/* <Recommend /> */}</ProtectedRoute>}
          />
          <Route
            path="/blog"
            element={<ProtectedRoute>{/* <Blog /> */}</ProtectedRoute>}
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </ApolloProvider>
);
