// add this import at the top
import fetch from 'node-fetch';
//Library with utilities to deal with arrays and more (see https://colintoh.com/blog/lodash-10-javascript-utility-functions-stop-rewriting)
import _ from 'lodash';

//Sample fetch
/* fetch('https://restcountries.eu/rest/v2/nameddd/' + "united")
	.then(res => res.json() )
  .then(json => {
    console.log(json);
  })
  .catch(err => console.error("Error: " + err));*/

// call REST Countries
var countries = {
  getCountriesByName(name) {
    //By default all countries are fetch if no arguments are received
    var URL = "https://restcountries.eu/rest/v2/all/";
    if (name!=undefined){
      //if name argument is received, search country by name
      var URL = "https://restcountries.eu/rest/v2/name/" + name;
    }
    //Fetch URL
    console.log("Fetching URL: " + URL);
    return fetch(URL)
      //returns with a promise
      .then(res => res.json())
      //once promised is fullfiled then we iterate through collection and map the values to the Country type
      .then(res => {
        //console.log(JSON.stringify(res));
        console.log("Total records found: " + res.length);
        var countryData = [];
        //we use the map function of lodash to iterate easily
        _.map(res, function(value, key) {
          countryData[key] = {
            id: value.numericCode,
            name: value.name,
            code: value.alpha3Code,
            capital: value.capital,
            region: value.region + " | " + value.subregion,
            currency: value.currencies[0].name + " | " + value.currencies[0].code + " | " + value.currencies[0].symbol,
            language: value.languages[0].name + " | " + value.languages[0].iso639_2
          };
        });
        return countryData;
      })
      //catch errors if any
      .catch(err => console.error("Error: " + err));
  }
};

export default countries;
