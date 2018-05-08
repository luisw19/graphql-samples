# graphql-samples

This repository contains a series of **GraphQL** step by step examples.

[graphql-countries-part1](https://github.com/luisw19/graphql-samples/tree/master/graphql-countries-part1)
shows how to create a simple **GraphQL Service** that fetches hard-coded countries data. The example shows how
to create a **GraphQL Schema** (With Object and Query types) and a resolver based on the **Apollo** GraphQL implementation.

[graphql-countries-part2](https://github.com/luisw19/graphql-samples/tree/master/graphql-countries-part2)
is a continuation of **graphql-countries-part1**, where code is refactored to separate concerns by keeping **server.js** light
and reference the Graph schema and resolvers from different files.
In this sample, we'll also implement the [REST Countries API](https://github.com/apilayer/restcountries) as a backend data source.

[graphql-countries-part3](https://github.com/luisw19/graphql-samples/tree/master/graphql-countries-part3)
is a continuation of **graphql-countries-part2**, where code is extended to also support **Mutations**.
In this sample, we'll also make use of [RequestBin](https://github.com/Runscope/requestbin) to
simulate POST calls against an REST backend.

[sqllite-rest-mongo-backend](https://github.com/luisw19/graphql-samples/tree/master/sqllite-rest-mongo-backend)
A project based on the tutorial [How to build a GraphQL server](https://medium.com/apollo-stack/tutorial-building-a-graphql-server-cddaa023c035#.wy5h1htxs)
by **Jonas Helfer** showing to implement a graphql service that talks with SQL, MongoDB and REST.
