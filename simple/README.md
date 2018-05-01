#Very Simple GraphQL Example

This is very simple GraphQL example using Node.JS Apollo-Server. Refer to http://graphql.org/code/#javascript for full list of example libraries for JavaScript.

1) Install node.js for your operating system. E.g. in Mac in can be installed with brew as following:

```bash
  brew install node
```

2) Create a node package

```bash
  npm init
```

3) Set up apollo-server-express, graphql-tools and graphql for the endpoint

```bash
  npm install --save apollo-server-express graphql-tools graphql express body-parser
```
4) Create server.js

```bash
  touch server.js
```
5) Modify server.js as following:

  a) Add the require libraries as indicated

  ```bash
  //Node app server
  const express = require('express');
  //To parse incoming requests
  const bodyParser = require('body-parser');
  //Apollo GraphQL server
  const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
  //GraphQL tools required to generate GraphQL schema
  const { makeExecutableSchema } = require('graphql-tools');
  ```

  b)
