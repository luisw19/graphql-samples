import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
//Imports the GraphQL Schema that defines all Types, Queries, Mutations and Resolvers
import schema from './data/schema';

//Key contants
const GRAPHQL_PORT = 3000;
const graphQLServer = express();

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    //`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
    `Listening on port ${GRAPHQL_PORT}`
  )
);

//example of how a promise works based on ES6 promise constructor. See https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261
const wait = time => new Promise((resolve) => setTimeout(resolve, time));
//Then handler to log once promise is fullfilled
wait(3000).then(() => console.log(`Access GraphiQL on http://localhost:${GRAPHQL_PORT}/graphiql`));
