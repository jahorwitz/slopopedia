import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useEffect, useState } from "react";
import { ClientContext } from "./client-context";

export const ClientContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [client, setClient] = useState(null);

  useEffect(() => {
    const httpLink = createHttpLink({
      uri: "https://slopopedia-api-a5fe9aef64e8.herokuapp.com/api/graphql",
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
        uri: "https://slopopedia-api-a5fe9aef64e8.herokuapp.com/api/graphql",
      });

      const authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          },
        };
      });
      client.setLink(authLink.concat(httpLink));
    }
  }, [token, client]);

  return client ? (
    <ClientContext.Provider value={{ token, setToken, client }}>
      {children}
    </ClientContext.Provider>
  ) : null;
};
