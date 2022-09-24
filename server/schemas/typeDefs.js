// import the gql tagged template function
const { gql } = require
  ('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
directive @isAuthenticated on FIELD_DEFINITION

type Query {
    me: User @isAuthenticated
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User @isAuthenticated
    removeBook(bookId: ID!): User @isAuthenticated
  }

  type User {
    _id: ID 
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }
  `;

// export the typeDefs
module.exports = typeDefs;