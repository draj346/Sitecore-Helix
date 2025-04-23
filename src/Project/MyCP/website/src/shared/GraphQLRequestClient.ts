import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-nextjs/graphql';
import config from 'temp/config';

export function GraphQLSearchClient() {
  const graphqlEndPoint = config.graphQLEndpoint;
  const apiKey = config.sitecoreApiKey;
  const graphClient = new GraphQLRequestClient(graphqlEndPoint, {
    apiKey: apiKey,
  });
  return graphClient;
}
