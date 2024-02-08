import React from "react";
import ReactDOM from "react-dom/client";
import "../src/global/default.css";
import { App } from "./App";
import { ClientContextProvider } from "./store";

// const httpLink = createHttpLink({
//   uri:
//     import.meta.env.MODE === "production"
//       ? import.meta.env.VITE_API_URI
//       : "https://slopopedia-api-a5fe9aef64e8.herokuapp.com/api/graphql",
// });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("jwt");
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const client = new ApolloClient({
//   uri:
//     //in Vite, use special object `import.meta.env` to access enviroment variables
//     import.meta.env.MODE === "production"
//       ? //created environment variables must be prefixed by VITE
//         import.meta.env.VITE_API_URI
//       : "https://slopopedia-api-a5fe9aef64e8.herokuapp.com/api/graphql",
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClientContextProvider>
      <App />
    </ClientContextProvider>
  </React.StrictMode>
);
