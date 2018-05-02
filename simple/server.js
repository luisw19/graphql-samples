//Node app server
const express = require('express');
//To parse incoming requests
const bodyParser = require('body-parser');
//Apollo GraphQL server
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
//GraphQL tools required to generate GraphQL schema
const { makeExecutableSchema } = require('graphql-tools');

// Define the GraphQL Types using the Type system. Note tha "!" means field is non-nunable
const typeDefs = `
  type Order {
    id: String!,
    price: Int
  }
  type Query {
    orders: [Order]
  }
`;

// Create some dummy data
const orders = [
  {
    id: "ORDER001",
    price: 22,
  },
  {
    id: "ORDER002",
    price: 100,
  },
];

// Add a resolver.
const resolvers = {
  Query: { orders: () => orders },
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
