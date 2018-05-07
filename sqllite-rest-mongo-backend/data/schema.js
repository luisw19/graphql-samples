import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';
//import mocks from './mocks';
import resolvers from './resolvers';

//Defines Types
const typeDefs = `
type Author {
  # Unique ID for the author
  id: Int
  #Author's first name
  firstName: String
  #Author's last name
  lastName: String
  #Aurthor's blog posts
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
