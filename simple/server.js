//Node app server
const express = require('express');
//To parse incoming requests
const bodyParser = require('body-parser');

//Apollo GraphQL server including Graphiql client
const {
  graphqlExpress,
  graphiqlExpress
} = require('apollo-server-express');

//GraphQL tools is an opinionated structure for building GraphQL schemas and resolvers in JavaScript
const {
  makeExecutableSchema
} = require('graphql-tools');

// Define the GraphQL Types using the Type system. Note tha "!" means field is non-nunable
const typeDefs = `
type Country {
  id: Int!
  name: String!,
  code: String!,
}
type Query {
  countries(id: Int): [Country]
}
`;

// Hardcode a response
const countryData = [{
  id: 826,
  name: "United Kingdom",
  code: "UK"
}];

// Add a resolver.
const resolvers = {
  Query: {
    countries: () => countryData
  },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
