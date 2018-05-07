# GraphQL Countries Part 2

This part is a continuation of [graphql-countries-part1](https://github.com/luisw19/graphql-samples/tree/master/graphql-countries-part1). In this part we'll refactor the code to separate concerns by keeping server.js and reference the Graph schema and resolvers from different files. In this sample, we'll also implement node-fetch to use the [REST Countries API](https://github.com/apilayer/restcountries) as a backend API.

Following a step by step guide on how to do this:

#### 1) Create a folder named **/resources** and within it, add two files: **types.js** and **resolvers.js**.

#### 2) Remove the following snippet from **server.js** and add to **types.js**

```javascript
const typeDefs = `
type Country {
  id: Int!,
  name: String!,
  code: String!
}
type Query {
  countries(id: Int): [Country]
}
`;
```

then append the following line to the end:

```javascript
export default typeDefs;
```

#### 3) Remove the following snippet from **server.js** and add to **resolvers.js**

```javascript
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
```

then append the following line to the end:

```javascript
export default resolvers;
```

#### 4) Now the constants **typeDef** (defined in **types.js**) and **resolver** (defined in **resolvers.js**) have to be imported into **server.js** as following:

```javascript
import typeDefs from './resources/types';
import resolvers from './resources/resolvers';
```

#### 5) Now run `npm start` to ensure it's all working. If successful output form command line should be something like this:

```bash
> simple@1.0.0 start /graphql/graphql-samples/graphql-countries-part2
> nodemon ./server.js --exec babel-node

[nodemon] 1.17.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `babel-node ./server.js`
Go to http://localhost:3000/graphiql to run queries!
```

#### 6) Now we'll make use of [node-fetch](https://www.npmjs.com/package/node-fetch) to fetch data from the [REST Countries API](https://github.com/apilayer/restcountries):

a) First we install the [node-fetch](https://www.npmjs.com/package/node-fetch) package:

```bash
npm install --save node-fetch
```

b) Now under **/resources** create a file called **data.js** where we'll add the logic to invoke the REST backend for each field of the **query operation** in the **resolvers**.

c)
