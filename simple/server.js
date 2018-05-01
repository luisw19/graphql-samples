//Node app server
const express = require('express');
//To parse incoming requests
const bodyParser = require('body-parser');
//Apollo GraphQL server
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
//GraphQL tools required to generate GraphQL schema
const { makeExecutableSchema } = require('graphql-tools');

// Define the GraphQL Types using the Type system
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

// Create some dummy data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// The resolvers
const resolvers = {
  Query: { books: () => books },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
