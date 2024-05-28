import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useEffect, useState } from "react";
import { mergeObject } from "../utils/constants";
import { ClientContext } from "./client-context";

export const ClientContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [client, setClient] = useState(null);

  const apiUri =
    process.env.NODE_ENV === "production"
      ? "https://slopopedia-api-a5fe9aef64e8.herokuapp.com/api/graphql"
      : "http://localhost:8080/api/graphql";

  useEffect(() => {
    const httpLink = createHttpLink({
      uri: apiUri,
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
        cache: new InMemoryCache(mergeObject),
      })
    );
  }, [token]);

  useEffect(() => {
    if (client) {
      const httpLink = createHttpLink({
        uri: apiUri,
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
