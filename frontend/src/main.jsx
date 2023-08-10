import React from "react";
import ReactDOM from "react-dom/client";
import "./default.css";

import { BrowserRouter, Switch } from "react-router-dom";
import { ProtectedRoute } from "./components/index";
import {
  BrowseRoute,
  FestsRoute,
  MainRoute,
  MovieRoute,
  SearchRoute,
  SoundsRoute,
} from "./routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <MainRoute />
        <BrowseRoute />
        <FestsRoute />
        <MovieRoute />
        <SearchRoute />
        <SoundsRoute />
        <ProtectedRoute path="/profile">{/* <Profile /> */}</ProtectedRoute>
        <ProtectedRoute path="/profile-settings">
          {/* <ProfileSettings /> */}
        </ProtectedRoute>
        <ProtectedRoute path="/preferences">
          {/* <Preferences /> */}
        </ProtectedRoute>
        <ProtectedRoute path="/submit">{/* <Submit /> */}</ProtectedRoute>
        <ProtectedRoute path="/submit-list">
          {/* <SubmitList /> */}
        </ProtectedRoute>
        <ProtectedRoute path="/recommend">{/* <Recommend /> */}</ProtectedRoute>
        <ProtectedRoute path="/blog">{/* <Blog /> */}</ProtectedRoute>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>
);
