//Node app server
import express from 'express';
//To parse incoming requests
import bodyParser from 'body-parser';
//Apollo GraphQL server including Graphiql client
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
//GraphQL tools is an opinionated structure for building GraphQL schemas and resolvers in JavaScript
import { makeExecutableSchema } from 'graphql-tools';

//Set Port. If environment variable exist use it instead
const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 3000;

// Define the GraphQL Types using the Type system. Note tha "!" means field is non-nunable
const typeDefs = `
type Country {
  id: Int!
  name: String!,
  code: String!
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
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
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
app.listen(GRAPHQL_PORT, () => {
  console.log('Go to http://localhost:' + GRAPHQL_PORT + '/graphiql to run queries!');
});
