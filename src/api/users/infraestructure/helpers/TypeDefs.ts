import { ITypeDefis } from "../../application/services/ITypeDefis";
import { gql } from "apollo-server-express";

export class TypeDefs implements ITypeDefis {
    typeDefs<DocumentNode>(): DocumentNode {
        return gql`
        type User {
            _id: ID
            name: String,
            lastName: String,
            badgeNumber: String,
            password: String,
            role: String
        }

        type TokenUser {
            token: String
            user: User
        }

        type Query {
            user(badgeNumber: String!): User
            users(limit: Int!): [User]
            usersByRole(role: String!, limit: Int!): [User]
        }

        type Mutation {
            deleteUser(badgeNumber: String!): User
            loginUser(badgeNumber: String!, password: String!): TokenUser
            registerUser(name: String!, lastName: String!, badgeNumber: String!, password: String!, role: String!): User
        }
        ` as DocumentNode
    }
}