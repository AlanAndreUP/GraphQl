import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './api/graphql/schemas';
import resolvers from './api/graphql/resolvers';
import { authenticate } from './api/graphql/utils/auth';

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  
});



app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000/api`)
);
