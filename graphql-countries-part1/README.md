# GraphQL Countries Part 1

This example shows how to create a simple GraphQL Service that fetches hard-coded countries data.  The example shows how to create a GraphQL Schema (With Object and Query types) and a resolver based on the  Apollo GraphQL implementation.

Following a step by step guide on how to complete this sample:

#### 1) Install **node.js** for your operating system. E.g. in Mac in can be installed with brew as following:

```bash
  brew install node
```

#### 2) Create a node package

```bash
  npm init
```

#### 3) Create **server.js**

```bash
  touch server.js
```

#### 4) Install [apollo-server-express](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express) and [graphql-tools](https://github.com/apollographql/graphql-tools) packages.

```bash
  npm install --save apollo-server-express graphql-tools graphql express body-parser
```
> Apollo is used to bind a JavaScript GraphQL schema to an HTTP server.
> GraphQL Tools is an npm package and an opinionated structure for how to build a GraphQL schema and resolvers in JavaScript.

#### 5) Install **nodemon** as a development dependencies so we don't have to stop/start the express server every time a change is made to the code.

a) Run:
```bash
npm install --save-dev nodemon
```

b) Then add/change the start script as following:

```javascript
"scripts": {
  "start": "nodemon ./server.js"
}
```

#### 6) To make use of ES6 syntax, lets configure [Babel](https://babeljs.io/) as following:

a) Install babel as a development dependency

```bash
npm install --save-dev babel-cli babel-preset-env
```

b) Add the babel environment present by appending the following to **packages.json**:

```javascript
"babel": {
  "presets": [
    "env"
  ]
}
```

c) Modify *start* script within **package.json** as following:

```javascript
"scripts": {
 "start": "nodemon ./server.js --exec babel-node"
}
```

> If this is not done you'll get the error **"SyntaxError: Unexpected token import"**.
> This is because the **import** syntax used in the code is not available in ES5. So
> babel converts ES6 syntax to ES5. Recommend [this article](https://medium.freecodecamp.org/whats-the-difference-between-javascript-and-ecmascript-cba48c73a2b5) for better understanding
> on the topic.

#### 7) Modify **server.js** as following:

  a) Add the require libraries as indicated.

  ```javascript
  const express = require('express');
  const bodyParser = require('body-parser');
  const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
  const { makeExecutableSchema } = require('graphql-tools');
  ```

  b) let's also define a constant called GRAPHQL_PORT that defines in which port the GraphQL server will listen to. The value of the constant should be picked up from the environment if en variable is available.

  ```javascript
  const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 3000;
  ```

  c) Define the GraphQL **Types**. In this simple example, just an **Order object type** and a **Query operation** against it. The Query operation allows for a countries to be searched based on their unique ID.

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

  d) For this simple example, we'll hard code the data in a constant for the **resolver** to use.

  ```javascript
  const countries = [
    {
      id: 826,
      name: "United Kingdom of GB",
      code: "UK"
    }
  ];
  ```

  f) Now we create a **resolver**. A resolver implements the operations, in this case, an operation named **query**.

  ```javascript
  const resolvers = {
    Query: {
      countries: () => countryData
    },
  };
  ```

  g) Now that the types and resolver are in place, a GraphQL executable **schema** can be created by making use of the **makeExecutableSchema** function part of **graphql-tools**.

  ```javascript
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  ```

  h) Lastly we initiate the express server and define the different URI's for the GraphQL service endpoints

  ```javascript
  // Initialize the app
  const app = express();

  // The GraphQL endpoint
  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

  // GraphiQL, a visual editor for queries
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  // Start the server
  app.listen(GRAPHQL_PORT, () => {
    console.log('Go to http://localhost:3000/graphiql to run queries!');
  });
  ```

#### 8) Start the GraphQL server by running

```bash
npm start
```

if successful the output should be something like this:

```bash
> simple@1.0.0 start /graphql/graphql-samples/graphql-countries-part2
> nodemon ./server.js --exec babel-node

[nodemon] 1.17.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `babel-node ./server.js`
Go to http://localhost:3000/graphiql to run queries!
```

#### 8) Access the **graphiql** (pronounce "graphical") client from the browser using the URL displayed. Try the following query:

```graphql
{
  countries {
    id
    name
  }
}
```

The result should be:

```graphql
{
  "data": {
    "countries": [
      {
        "id": 826,
        "name": "United Kingdom"
      }
    ]
  }
}
```
