// Define the GraphQL Types using the Type system. Note tha "!" means field is non-nunable
const typeDefs = `
type Country {
  id: Int,
  name: String!,
  code: String!,
  area: String,
  capital: String,
  population: String,
  region: String,
  currency: String,
  language: String
}
type Query {
  getCountriesByCode(code: String): Country
}
`;

export default typeDefs;
