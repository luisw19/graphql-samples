# apollo-tutorial-kit

Repository created based on the Apollo tutorial documented on blog post: [How to build a GraphQL server](https://medium.com/apollo-stack/tutorial-building-a-graphql-server-cddaa023c035#.wy5h1htxs).

Up-to-date documentation and explanations can be found in the [Apollo Server docs](https://www.apollographql.com/docs/apollo-server/)

## Running the demo:

```bash
git clone https://github.com/luisw19/graphql-samples.git
cd apollo-tutorial-kit
npm install
npm start
```

Open [http://localhost:3000/graphiql](http://localhost:3000/graphiql) and paste the following query:

```graphql
query {
  author(firstName:"Edmond", lastName: "Jones"){
    firstName
    lastName
    posts{
      title
      views
    }
  }
}
```

Click on the play button (cmd-return), response should be something like:

```json
{
  "data": {
    "author": {
      "firstName": "Hola",
      "lastName": "Mundo",
      "posts": [
        {
          "title": "Blog",
          "views": 2
        },
        {
          "title": "Otro Blog",
          "views": 200
        }
      ]
    }
  }
}
```
