import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './api/graphql/schemas';
import resolvers from './api/graphql/resolvers';
import { authenticate } from './api/graphql/utils/auth';

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
   
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server readHolay at http://localhost:4000${server.graphqlPath}`);
  });
}

(async () => {
  try {
    await startApolloServer();
  } catch (e) {
    console.error(e);
  }
})();
