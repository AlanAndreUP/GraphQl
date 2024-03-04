import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
<<<<<<< Updated upstream
    name: string,
    lastName: string,
    badgeNumber: string,
    password: string,
    role: string
=======
    name: String
    email: String!
    password: String
>>>>>>> Stashed changes
  }

  type Query {
    users(page: Int, limit: Int): [User]
    user(id: ID!): User
  }

  type Mutation {
    registerUser(user: RegisterUserInput!): User
    loginUser(email: String!, password: String!): String # JWT token
  }
  
  input RegisterUserInput {
    name: String!
    email: String!
    password: String!
  }
`;

export default typeDefs;
