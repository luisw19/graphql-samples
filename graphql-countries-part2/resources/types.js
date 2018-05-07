// Define the GraphQL Types using the Type system. Note tha "!" means field is non-nunable
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

export default typeDefs;
