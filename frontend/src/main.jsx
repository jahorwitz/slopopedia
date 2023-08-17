import React from "react";
import ReactDOM from "react-dom/client";
import "./default.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
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
      <Routes>
        <Route path="/" element={<MainRoute />} />
        <Route path="/browse" element={<BrowseRoute />} />
        <Route path="/browse" element={<FestsRoute />} />
        <Route path="/browse" element={<MovieRoute />} />
        <Route path="/browse" element={<SearchRoute />} />
        <Route path="/browse" element={<SoundsRoute />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
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
          element={<ProtectedRoute>{/* <Submit /> */}</ProtectedRoute>}
        />
        <Route
          path="/submit-list"
          element={<ProtectedRoute>{/* <SubmitList /> */}</ProtectedRoute>}
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
);
