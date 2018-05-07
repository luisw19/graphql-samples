//import countries from './data'

// Add a resolver.
/*const resolvers = {
  Query: {
    countries() {
      return countries.getCountriesByName("United");
    }
  }
};*/

// Hardcode a response
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
};


export default resolvers;
