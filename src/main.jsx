import React from "react";
import ReactDOM from "react-dom/client";
import "../src/global/default.css";
import { App } from "./App";
import { ClientContextProvider } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClientContextProvider>
      <App />
    </ClientContextProvider>
  </React.StrictMode>
);
