import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    name: String,
    lastName: String,
    badgeNumber: String,
    password: String,
    role: String
  }

  type Query {
    users(page: Int, limit: Int): [User]
    user(id: ID!): User
  }

  type Mutation {
    registerUser(name: String!, email: String!, password: String!): User
    loginUser(email: String!, password: String!): String # JWT token
  }
`;

export default typeDefs;
