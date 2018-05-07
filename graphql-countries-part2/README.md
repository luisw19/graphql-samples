# GraphQL Countries Part 2

This part is a continuation of [graphql-countries-part1](https://github.com/luisw19/graphql-samples/tree/master/graphql-countries-part1). In this part we'll refactor the code to separate concerns by keeping server.js and reference the Graph schema and resolvers from different files. In this sample, we'll also implement node-fetch to use the [REST Countries API](https://github.com/apilayer/restcountries) as a backend API.

Following a step by step guide on how to do this:

#### 1) Create a folder named **/resources** and within it, add two files: **types.js** and **resolvers.js**.

#### 2) Remove **typeDefs** from **server.js** and add to **resources/types.js**

```javascript
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
```

then append the following line to the end:

```javascript
export default typeDefs;
```

#### 3) Remove the following snippet from **server.js** and add to **resources/resolvers.js**

```javascript
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
```

then append the following line to the end:

```javascript
export default resolvers;
```

#### 4) Import **typeDef** (defined in **resources/types.js**) and **resolvers** (defined in **resources/resolvers.js**) by adding the following lines to **server.js**

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

Then a similar query to [part1](https://github.com/luisw19/graphql-samples/tree/master/graphql-countries-part1) and result should be similar.

#### 6) Now under **/resources** create a file called **data.js** where we'll add the logic to invoke the REST backend for each field of the **query operation** in the **resolvers**.

we'll make use of [node-fetch](https://www.npmjs.com/package/node-fetch) to fetch data from the [REST Countries API](https://github.com/apilayer/restcountries) and [Lodash](https://lodash.com/) to deal with arrays more easily.

a) First we install [node-fetch](https://www.npmjs.com/package/node-fetch) and [lodash](https://lodash.com/) packages:

```bash
npm install --save node-fetch lodash
```

d) Add the following code. Descriptions inline.

```javascript
import fetch from 'node-fetch';
import _ from 'lodash';

// call REST Countries
const countries = {
  getCountriesByName(name) {
    //By default all countries are fetch if no arguments are received
    var URL = "https://restcountries.eu/rest/v2/all/";
    if (name!=undefined){
      //if name argument is received, search country by name
      var URL = "https://restcountries.eu/rest/v2/name/" + name;
    }
    //Fetch URL
    console.log("Fetching URL: " + URL);
    return fetch(URL)
      //returns with a promise
      .then(res => res.json())
      //once promised is fullfiled then we iterate through collection and map the values to the Country type
      .then(res => {
        //console.log(JSON.stringify(res));
        console.log("Total records found: " + res.length);
        const countryData = [];
        //we use the map function of lodash to iterate easily
        _.map(res, function(value, key) {
          countryData[key] = {
            id: value.numericCode,
            name: value.name,
            code: value.alpha3Code,
            capital: value.capital,
            region: value.region + " | " + value.subregion,
            currency: value.currencies[0].name + " | " + value.currencies[0].code + " | " + value.currencies[0].symbol,
            language: value.languages[0].name + " | " + value.languages[0].iso639_2
          };
        });
        return countryData;
      })
      //catch errors if any
      .catch(err => console.error("Error: " + err));
  }
};

export default countries;
```
#### 7) Modify **resources/resolvers.js** as following:

a) first import **coutries** from **data.js**

```javascript
import countries from './data'
```

b) Comment out **countryData** as we'll fetch data in real time.

c) Modify the **resolver** so the **Query** operation takes arguments and also makes use of **countries.getCountriesByName** imported from **data.js**

```javascript
const resolvers = {
  Query: {
    //countries now takes arguments
    countries(_, args) {
      //take the argument "name" and use it to search get a country by name
      return countries.getCountriesByName(args.name);
    }
  }
};
```

#### 8) Start the server by running `npm start` and then run the following query:

```graphql
query{
  countries {
    id
    name
    code
    capital
    region
    currency
    language
  }
}
```

The result should be a list of around 250 countries.

```bash
Fetching URL: https://restcountries.eu/rest/v2/all/
Total records found: 250
```
