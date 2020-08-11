import { ApolloLink, ApolloClient, InMemoryCache } from "apollo-client-preset";
import { createUploadLink } from "apollo-upload-client";

const httpLink = new createUploadLink({
  uri: "http://localhost:8000/graphql",
});

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("access_token");
  const authorizationHeader = token ? token : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: middlewareAuthLink.concat(httpLink),
  cache: new InMemoryCache(),
  query: { fetchPolicy: "no-cache" },
});

export default client;
