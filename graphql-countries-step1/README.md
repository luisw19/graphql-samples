# GraphQL Countries Step 1

This example shows how to create a simple GraphQL Service that fetches hard-coded countries data.  The example shows how to create a GraphQL Schema (With Object and Query types) and a resolver based on the  Apollo GraphQL implementation.

Following a step by step guide on how to complete this sample:

1) Install node.js for your operating system. E.g. in Mac in can be installed with brew as following:

```bash
  brew install node
```

2) Create a node package

```bash
  npm init
```

3) Set up apollo-server-express, graphql-tools and graphql for the endpoint. Apollo is used to bind a JavaScript GraphQL schema to an HTTP server. GraphQL Tools is an npm package and an opinionated structure for how to build a GraphQL schema and resolvers in JavaScript.

```bash
  npm install --save apollo-server-express graphql-tools graphql express body-parser
```
4) Create server.js

```bash
  touch server.js
```
5) Modify server.js as following:

  a) Add the require libraries as indicated

  ```javascript
  const express = require('express');
  const bodyParser = require('body-parser');
  const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
  const { makeExecutableSchema } = require('graphql-tools');
  ```

  b) Define the GraphQL types. In this simple example, just an Order Object and a Query operation against it. The Query operation allows for a countries to be searched based on their unique ID

  ```javascript
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
  ```
  c) For this simple example, we'll hard code a response as in this simple example we're not connecting to a data source

  ```javascript
  const countries = [
    {
      id: 826,
      name: "United Kingdom of GB",
      code: "UK"
    }
  ];
  ```

  d) Now we create a resolver. A resolver implements the operations, in this case, a Query.

  ```javascript
  const resolvers = {
    Query: {
      countries: () => countryData
    },
  };
  ```

  e) Now that the types and resolver are in place, the GraphQL schema can be created by making use of the "makeExecutableSchema" function part of "graphql-tools"

  ```javascript
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  ```

  d) Lastly we initiate the express server and define the different URI's the GraphQL service will resolve to

  ```javascript
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
  ```

5) Start the GraphQL service

  ```bash
  npm start
  ```
  or just

  ```bash
  node server.js
  ```
6) Access the Graphiql (pronounce "graphical") client by opening the URL as indicated: http://localhost:3000/graphiql
