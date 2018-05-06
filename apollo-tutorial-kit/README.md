# Apollo sample on how to build a GraphQL server.

Sample based on the Apollo tutorial documented on blog post: [How to build a GraphQL server](https://medium.com/apollo-stack/tutorial-building-a-graphql-server-cddaa023c035#.wy5h1htxs) by Jonas Helfer.

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
  getFortuneCookie
  author(firstName:"Edmond", lastName: "Jones"){
    firstName
    lastName
    posts{
      title
      views
    }
  }
  allAuthors{
    firstName
    posts{
      title
      text
      views
    }
  }
}
```

Click on the play button (cmd-return), response should be something like:
```json
{
  "data": {
    "getFortuneCookie": "One false move may lose the game.",
    "author": {
      "firstName": "Edmond",
      "lastName": "Jones",
      "posts": [
        {
          "title": "A post by Edmond",
          "views": 92
        }
      ]
    },
    "allAuthors": [
      {
        "firstName": "Maurine",
        "posts": [
          {
            "title": "A post by Maurine",
            "text": "Et qui quia odio dolore. Eligendi in deserunt. Harum sit odio dolor dicta provident quo provident.",
            "views": 0
          }
        ]
      },
      {
        "firstName": "Edmond",
        "posts": [
          {
            "title": "A post by Edmond",
            "text": "Harum ullam pariatur quos est quod. Ea quisquam esse quia et commodi autem. Ut exercitationem maiores et voluptas.",
            "views": 92
          }
        ]
      }
    ]
  }
}
```


## Packages installed durig the tutorial

1) Casual: a fake data generator: https://github.com/boo1ean/casual
```bash
npm install casual --save
```

2) Sequelize: a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL. See http://docs.sequelizejs.com/
```bash
npm install --save sequelize sqlite lodash
```

3) Mongoose: provides a straight-forward, schema-based solution to model/persist application data in MongoDB: http://mongoosejs.com/
```bash
npm install --save mongoose
```

4) Node-fetch: a library to quickly fetch HTTP URLs. See: https://www.npmjs.com/package/node-fetch See http://docs.sequelizejs.com/
```bash
npm install --save node-fetch
```
