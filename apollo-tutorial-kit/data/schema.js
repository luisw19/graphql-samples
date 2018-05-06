import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';
//import mocks from './mocks';
import resolvers from './resolvers';

//Defines Types
const typeDefs = `
type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}

type Post {
  id: Int
  title: String
  text: String
  views: Int
  author: Author
}

type Query {
  author(firstName: String, lastName: String): Author
  allAuthors: [Author]
  getFortuneCookie: String
}
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

/*addMockFunctionsToSchema({
  schema,
  mocks
});*/

export default schema;
