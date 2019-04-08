//Node app server
import express from 'express';
//Add CORS for JET UI
import cors from 'cors';
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

// Initialize the HTTP server using express
const server = express();

//Generate the executable schema. Note that makeExecutableSchema expects typeDefs and resolvers as input
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

//Define the GraphQL endpoint using the Apollo GraphQL Server. Note that graphqlExress expects the schema constant
server.use('/graphql', cors(), bodyParser.json(), graphqlExpress({
  schema
}));

//Implement the Graphiql client available that comes with the Apollo GraphQL Server
server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

// Start the server
server.listen(GRAPHQL_PORT, () => {
  console.log('Go to http://localhost:' + GRAPHQL_PORT + '/graphiql to run queries!');
});
