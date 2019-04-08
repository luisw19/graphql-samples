import countries from './data'

// Resolvers including Query for searching countries
const resolvers = {
  Query: {
    //countries by code takes arguments
    getCountriesByCode(_, args) {
      //take the argument "code" and use it to search get a country by code
      return countries.getCountriesByCode(args.code);
    }
  }
};

export default resolvers;
