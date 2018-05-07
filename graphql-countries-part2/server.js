//Node app server
import express from 'express';
//To parse incoming requests
import bodyParser from 'body-parser';
//Apollo GraphQL server including Graphiql client
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
//GraphQL tools is an opinionated structure for building GraphQL schemas and resolvers in JavaScript
import { makeExecutableSchema } from 'graphql-tools';

//Import the GraphQL Schema that defines all Operations (Queries, Mutations) and other types
import typeDefs from './resources/types';
//Import Resolvers, which defines how an operation is executed
import resolvers from './resources/resolvers';

//Set Port. If environment variable exist use it instead
const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 3000;

// Compile the Type Definitions into an executable GraphQL schema using graph-tools
const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Initialize the HTTP server using express
const server = express();

//Define the GraphQL endpoint using the Apollo GraphQL Server
server.use('/graphql', bodyParser.json(), graphqlExpress({
  executableSchema
}));

//Implement the Graphiql client available that comes with the Apollo GraphQL Server
server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

// Start the server
server.listen(GRAPHQL_PORT, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
