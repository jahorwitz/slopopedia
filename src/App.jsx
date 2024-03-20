import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute, Submit, SubmitList } from "./components";
import { useClient } from "./hooks";
import {
  ArticleRoute,
  BlogRoute,
  BrowseRoute,
  DraftRoute,
  FestDiscussion,
  FestRoute,
  FestsRoute,
  MainRoute,
  MovieRoute,
  PreferencesRoute,
  ProfileFestsRoute,
  ProfileRoute,
  ProfileSettingsRoute,
  SearchRoute,
  SoundsRoute,
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
                path="/submit-list"
                element={
                  <ProtectedRoute>
                    <SubmitList />
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
    </ApolloProvider>
  );
};
