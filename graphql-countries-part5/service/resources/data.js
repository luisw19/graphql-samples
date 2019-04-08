// add this import at the top
import fetch from 'node-fetch';

// call REST Countries
var countries = {
  getCountriesByCode(code) {
    //By default all countries are fetch if no arguments are received
    var URL = "https://restcountries.eu/rest/v2/alpha/" + code;
    //Fetch URL
    console.log("Fetching URL: " + URL);
    return fetch(URL)
      //returns with a promise
      .then(res => res.json())
      //once promised is fullfiled then we iterate through collection and map the values to the Country type
      .then(res => {
        console.log("Total records found: 1");
        return {
          id: res.numericCode,
          name: res.name,
          code: res.alpha3Code,
          area: res.area,
          capital: res.capital,
          population: res.population,
          region: res.region + " | " + res.subregion,
          currency: res.currencies[0].name + " | " + res.currencies[0].code + " | " + res.currencies[0].symbol,
          language: res.languages[0].name + " | " + res.languages[0].iso639_2
        };
      })
      //catch errors if any
      .catch(err => console.error("Error: " + err));
  }
};

export default countries;
