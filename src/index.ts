import express, { Request, Response, NextFunction } from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './api/graphql/schemas';
import resolvers from './api/graphql/resolvers';
import { authenticate } from './api/graphql/utils/auth';
import { mongodbConnect } from './api/database/mongodb.database';

interface Context {
  user?: any; 
}

interface AuthRequest extends Request {
  user?: any; 
}

async function startApolloServer() {
  const app = express();

 
  app.use((req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization || '';
 
    try {
      const user = authenticate(token.replace('Bearer ', ''));
      req.user = user;
    } catch (error) {
      console.error(error);
    
    }
    next();
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: { req: AuthRequest }): Context => {
   
      const path = req.body.operationName;
      if (path !== 'LoginUser' && path !== 'RegisterUser') {
        const token = req.headers.authorization || '';
        try {
        console.log(path);
          const user = authenticate(token.replace('Bearer ', ''));
          return { user };
        } catch (error) {
         
     
        }
      }

      return {};
    },
  });

  await mongodbConnect();
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

(async () => {
  try {
    await startApolloServer();
  } catch (e) {
    console.error(e);
  }
})();
