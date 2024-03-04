import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useEffect, useState } from "react";
import { ClientContext } from "./client-context";

export const ClientContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [client, setClient] = useState(null);

  // useEffect(() => {
  //   setToken(localStorage.getItem("jwt"));
  // }, []);

  useEffect(() => {
    const httpLink = createHttpLink({
      uri:
        //in Vite, use special object `import.meta.env` to access enviroment variables
        import.meta.env.MODE === "production"
          ? //created environment variables must be prefixed by VITE
            import.meta.env.VITE_API_URI
          : "https://slopopedia-api-a5fe9aef64e8.herokuapp.com/api/graphql",
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });
    setClient(
      new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      })
    );
  }, []);

  useEffect(() => {
    if (client) {
      const httpLink = createHttpLink({
        uri:
          //in Vite, use special object `import.meta.env` to access enviroment variables
          import.meta.env.MODE === "production"
            ? //created environment variables must be prefixed by VITE
              import.meta.env.VITE_API_URI
            : "https://slopopedia-api-a5fe9aef64e8.herokuapp.com/api/graphql",
      });

      const authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          },
        };
      });
      console.log(client);
      client.setLink(authLink.concat(httpLink));
    }
  }, [token]);

  return client ? (
    <ClientContext.Provider value={{ token, setToken, client }}>
      {children}
    </ClientContext.Provider>
  ) : null;
};
