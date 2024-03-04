import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    name: String
    lastName: String
    email: String!
    badgeNumber: String
    password: String
    role: String
  }

  type UsersPage {
    users: [User]
    totalPages: Int
    currentPage: Int
  }

  type Query {
    users(page: Int, limit: Int): UsersPage
    user(id: ID!): User
    searchUsers(searchTerm: String!): [User]
    usersWithFilters(role: String!): [User]
    totalUserCount: Int
  }

  type Mutation {
    registerUser(user: RegisterUserInput!): User
    loginUser(email: String!, password: String!): String # JWT token
    updateUser(id: ID!, name: String, email: String): User
    changeUserPassword(userId: ID!, oldPassword: String!, newPassword: String!): Boolean
    changeUserEmail(userId: ID!, oldEmail: String!, newEmail: String!): Boolean
    deleteUser(userId: ID!): Boolean
  }
  input RegisterUserInput {
    name: String!
    email: String!
    password: String!
  }
`;

export default typeDefs;
