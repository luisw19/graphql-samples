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
input CountryInput {
  id: Int!,
  name: String!,
  code: String!,
  capital: String!,
  region: String!,
  currency: String!,
  language: String!
}
type Query {
  getCountries(name: String): [Country]
}
type Mutation {
  upsertCountry(input: CountryInput!): Country
}
`;

export default typeDefs;
