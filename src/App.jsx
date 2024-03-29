import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute, Submit } from "./components";
import { useClient } from "./hooks";
import {
  ArticleRoute,
  ArticlesRoute,
  BrowseRoute,
  DraftRoute,
  FestDiscussion,
  FestRoute,
  MainRoute,
  MovieRoute,
  PreferencesRoute,
  ProfileFestsRoute,
  ProfileRoute,
  ProfileSettingsRoute,
  ReviewRoute,
  SearchRoute,
  SoundsRoute,
  SubmittedSlopsRoute,
} from "./routes";
import { CurrentUserContextProvider, ModalContextProvider } from "./store";

export const App = () => {
  const { client } = useClient();

  return (
    <ApolloProvider client={client}>
      <CurrentUserContextProvider>
        <ModalContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainRoute />} />
              <Route path="/browse" element={<BrowseRoute />} />
              <Route path="/movie" element={<MovieRoute />} />
              <Route path="/search" element={<SearchRoute />} />
              <Route path="/sounds" element={<SoundsRoute />} />
              <Route path="/draft" element={<DraftRoute />} />
              <Route path="/articles" element={<ArticlesRoute />} />
              <Route exact path="/articles/create" element={<ArticleRoute />} />
              <Route exact path="/articles/:id" element={<ReviewRoute />} />
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
                path="/profile/settings"
                element={
                  <ProtectedRoute>
                    <ProfileSettingsRoute />
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
                path="/submitted-list"
                element={
                  <ProtectedRoute>
                    <SubmittedSlopsRoute />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recommend"
                element={<ProtectedRoute>{/* <Recommend /> */}</ProtectedRoute>}
              />
              <Route
                path="/articles/:id/edit"
                element={
                  <ProtectedRoute>
                    <ArticleRoute />
                  </ProtectedRoute>
                }
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
    </ApolloProvider>
  );
};
