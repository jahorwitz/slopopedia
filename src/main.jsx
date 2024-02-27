import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/global/default.css";
import {
  EditSlop,
  ProtectedRoute,
  Submit,
  SubmitList,
} from "./components/index";
import {
  ArticleRoute,
  BlogRoute,
  BrowseRoute,
  DraftRoute,
  FestsRoute,
  MainRoute,
  MovieRoute,
  PreferencesRoute,
  ProfileFestsRoute,
  ProfileRoute,
  SearchRoute,
  SoundsRoute,
} from "./routes";
import { FestDiscussion, FestRoute } from "./routes/fest-route";
import { CurrentUserContextProvider, ModalContextProvider } from "./store";

const httpLink = createHttpLink({
  uri:
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URI
      : "http://localhost:8080/api/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("jwt");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  uri:
    //in Vite, use special object `import.meta.env` to access enviroment variables
    import.meta.env.MODE === "production"
      ? //created environment variables must be prefixed by VITE
        import.meta.env.VITE_API_URI
      : "http://localhost:8080/api/graphql",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <CurrentUserContextProvider>
        <ModalContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainRoute />} />
              <Route path="/browse" element={<BrowseRoute />} />
              <Route path="/fests" element={<FestsRoute />} />
              <Route path="/movie" element={<MovieRoute />} />
              <Route path="/search" element={<SearchRoute />} />
              <Route path="/sounds" element={<SoundsRoute />} />
              <Route path="/blog" element={<BlogRoute />} />
              <Route path="/draft" element={<DraftRoute />} />
              <Route path="/article" element={<ArticleRoute />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute user={"user"}>
                    <ProfileRoute />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/fests"
                element={
                  <ProtectedRoute>
                    <ProfileFestsRoute />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/preferences/:value"
                element={
                  <ProtectedRoute>
                    <PreferencesRoute />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/submit"
                element={
                  <ProtectedRoute>
                    <Submit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/submit-list"
                element={
                  <ProtectedRoute>
                    <SubmitList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-slop/:slopId"
                element={
                  <ProtectedRoute>
                    <EditSlop />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recommend"
                element={<ProtectedRoute>{/* <Recommend /> */}</ProtectedRoute>}
              />
              <Route
                path="/blog"
                element={<ProtectedRoute>{/* <Blog /> */}</ProtectedRoute>}
              />
              <Route
                path="/fests/:festId"
                element={
                  <ProtectedRoute>
                    <FestRoute />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/fests/:festId/discussion"
                element={
                  <ProtectedRoute>
                    <FestDiscussion />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </ModalContextProvider>
      </CurrentUserContextProvider>
    </React.StrictMode>
  </ApolloProvider>
);
