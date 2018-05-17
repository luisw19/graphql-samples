import {countries, country, conversion} from './data'

/*// Hardcode a response
const countryData = [{
  id: 826,
  name: "United Kingdom",
  code: "UK",
  capital: "London",
  region: "Europe",
  currency: "British pound (GBP) - £",
  language: "English"
}];

// Add a resolver.
const resolvers = {
  Query: {
    getCountries: () => countryData
  }
};
};*/

// Resolvers including Query for searching countries
const resolvers = {
  Query: {
    //countries now takes arguments
    getCountries(_, args) {
      console.log(args);
      //take the argument "name" and use it to search get a country by name
      return countries.getCountriesByName(args);
    }
  },
  Mutation: {
    //Operation that simulates an insert or update operation
    upsertCountry(_, args) {
      //take as argument the payload to update
      return country.upsertCountry(args);
    }
  },
  Currency: {
    rate(_){
        //call function to obtain conversion rates from conversation rate API,
        //passing as input the current value of Currency based on previous resolver
        var convertTo = _.code + "_" + _.conversion;
        console.log("Converting: " + convertTo);
        return conversion.convert(convertTo);
    }
  }
};

export default resolvers;
