import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    name: String,
    lastName: String,
    email: String!
    badgeNumber: String,
    password: String,
    role: String
  }

  type Query {
    users(page: Int, limit: Int): [User]
    user(id: ID!): User
  }

  type Mutation {
    mutation RegisterNewUser($user: RegisterUserInput!) {
      registerUser(user: $user) {
        id
        name
        lastName
        email
        badgeNumber
        password
        role
      }
    }
    loginUser(email: String!, password: String!): String # JWT token
  }
  input RegisterUserInput {
    name: String!
    email: String!
    password: String!
  }
  
`;

export default typeDefs;
