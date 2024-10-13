import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "http://consulta-processual-client:4000/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
