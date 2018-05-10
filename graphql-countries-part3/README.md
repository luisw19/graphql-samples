# GraphQL Countries Part 3

This part is a continuation of [graphql-countries-part2](https://github.com/luisw19/graphql-samples/tree/master/graphql-countries-part2).
In this part we'll refactor the code to add support for **mutations**.

Mutations in GraphQL allow for data to be created/updated (basically the equivalent to POST/PUT/PATCH in REST conventions).
Mutation operations are defined in a similar way to queries. However while query fields are executed in parallel,
mutation fields run in series, one after the other.

Note that because [REST countries](https://restcountries.eu) doesn't support POST/PUT/PATCH (is pretty much a read only API),
will simulate an update by using [RequestBin](https://github.com/Runscope/requestbin).

Following the steps on how to do this:

#### 1) To simulate a HTTP POST, we'll make use of [RequestBin](https://github.com/Runscope/requestbin). Installed as following:

a) Install locally in your environment:
```bash
git clone git://github.com/Runscope/requestbin.git
cd requestbin
docker-compose build
docker-compose up -d
```

> Depending on your environment you might have to run docker with **sudo** e.g. `**sudo** docker compose build`.

b) Open the page http://localhost:3000 and click on **Create a RequestBin**.

c) Take note of the URL (will be use later).

#### 1) Modify the constant **typeDefs** within **resources/types.js** as following:

 a) An **input** type named **CountryInput** to define which fields can be modified in the mutation:

```javascript
input CountryInput {
  id: Int!,
  name: String!,
  code: String!,
  capital: String!,
  region: String!,
  currency: String!,
  language: String!
}
```

b) Add the **Mutation** type with an operation named **upsertCountry** which will take as argument the
input type defined earlier (**CountryInput**) and will use as response the **Country** object type to
present the updated/created record

```javascript
type Mutation {
  upsertCountry(input: CountryInput!): Country
}
```

#### 2) Modify **resources/resolvers.js** to add a resolver for the mutation type recently created:

a) Modify the **import** statement to also import the constant **country**

```javascript
import {countries, country} from './data'
```

b) Then define the **Mutation** document with an operation named **upsertCountry**.
The **args** argument, takes as input the payload to be used. Then noticed that the
result will be the outcome of invoking the function country.upsertCountry which takes
as input **args**.

```javascript
Mutation: {
  upsertCountry(_, args) {
    return country.upsertCountry(args);
  }
}
```
#### 3) Now we have to modify **resources/data.js** to implement the function **country.upsertCountry**
referred to in the mutation operation **upsertCountry**.

a) First we define a constant called **country** and within a function called **upsertCountry** that
takes as input the argument **body**. Then we make use of **node-fetch** but this time to make a
**HTTP POST** call to the **RequestBin** URL previously generated. If the promise fulfils, it means the
POST call was successful and we can just send back the same input.

```javascript
var country = {
  upsertCountry(body) {
    //Paste a RequestBin generated URL here.
    var URL = "http://localhost:8000/18mo63u1";
    console.log("Posting to URL " + URL + " the following payload: " + JSON.stringify(body));
    //return fetch(URL, { method: 'POST', body:  country})
    return fetch(URL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      //returns with a promise
      .then(res => res.text())
      //once promised is fullfiled then httpbin just returns the same payload we've sent
      .then(res => {
        //if response is OK, then we just send back same input
        console.log(res);
        return body.input;
      })
      //catch errors if any
      .catch(err => console.error("Error: " + err));
  }
};
```
Then add **country** to the export so it can be picked up by **data.js**.

```javascript
export {countries, country};
```

#### 4) Open **graphiql** editor and try the following mutation:

```graphql
mutation UpsertCountry ($inputVar: CountryInput!){
  upsertCountry(input: $inputVar){
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
> Notice that the values for the fields were not defined in the mutation itself.
> instead, an input variable $inputVar was defined as type **CountryInput!** (! meaning is mandatory)
> and used as input argument in the **upsertCountry** operation.

Once the **mutation** is added, set values for each field in the **QUERY VARIABLES** section:

```javascript
{
  "inputVar": {
    "id": 400,
    "name": "Mars",
    "code": "MAR",
    "capital": "Tempe Terra",
    "region": "Northern Lowlands",
    "currency": "Mars quid",
    "language": "Martian"
  }
}
```
