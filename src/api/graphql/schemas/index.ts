import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    name: string,
    lastName: string,
    badgeNumber: string,
    password: string,
    role: string
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
