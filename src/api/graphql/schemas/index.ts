import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type WebhookDetails {
    url: String
    eventName: String
  }

  type User {
    id: ID!
    name: String
    lastName: String
    email: String!
    badgeNumber: String
    password: String
    role: String
    webhooksDetails: [WebhookDetails]
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
    totalOfEvents(url: String, eventName: String): [User]
  }

  type Mutation {
    registerUser(user: RegisterUserInput!): User
    loginUser(email: String!, password: String!): String
    updateUser(id: ID!, name: String, email: String): User
    changeUserPassword(userId: ID!, oldPassword: String!, newPassword: String!): Boolean
    changeUserEmail(userId: ID!, oldEmail: String!, newEmail: String!): Boolean
    deleteUser(userId: ID!): Boolean
    addEventWebhook(id: ID!, WebhookDetails: InputWebhookDetails): User
  }
  
  input RegisterUserInput {
    name: String!
    email: String!
    password: String!
    role: String!
  }

  input InputWebhookDetails {
    url: String!
    eventName: String!
  }
  
`;

export default typeDefs;
