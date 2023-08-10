import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import "./default.css";

const client = new ApolloClient({
  uri:
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URI
      : "http://localhost:8080/api/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <React.StrictMode></React.StrictMode>
  </ApolloProvider>
);
