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

// Initialize the app
const server = express();

// Define the GraphQL Types using the Type system. Note tha "!" means field is non-nunable
const typeDefs = `
  type Country {
    id: Int,
    name: String!,
    code: String,
    capital: String,
    region: String,
    currency: String,
    language: String
  }
  type Query {
    countries(name: String): [Country]
  }
`;

// Hardcode a response
const countryData = [{
  id: 826,
  name: "United Kingdom",
  code: "UK",
  capital: "London",
  region: "Europe",
  currency: "British pound (GBP) - £",
  language: "English"
}];

// Add a resolver.
const resolvers = {
  Query: {
    countries: () => countryData
  }
};

//Generate the executable schema. Note that makeExecutableSchema expects typeDefs and resolvers as inp
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

//Define the GraphQL endpoint using the Apollo GraphQL Server. Note that graphqlExress expects the schema constant
server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

// GraphiQL, a visual editor for queries
server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

// Start the server
server.listen(GRAPHQL_PORT, () => {
  console.log('Go to http://localhost:' + GRAPHQL_PORT + '/graphiql to run queries!');
});
