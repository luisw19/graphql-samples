//Define the GraphQL Types
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

export default typeDefs;
