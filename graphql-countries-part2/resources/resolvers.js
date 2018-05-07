import countries from './data'

/*// Hardcode a response
const countryData = [{
  id: 826,
  name: "United Kingdom",
  code: "UK"
}];

// Add a resolver.
const resolvers = {
  Query: {
    countries: () => countryData
  }
};*/

// Add a resolver.
const resolvers = {
  Query: {
    countries(_, args) {
      return countries.getCountriesByName(args.name);
    }
  }
};

export default resolvers;
