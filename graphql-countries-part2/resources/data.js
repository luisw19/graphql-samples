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
const countries = {
  getCountriesByName(name) {
    console.log("searching: " + name)
    var URL = "https://restcountries.eu/rest/v2/all/";
    if (name!=undefined){
      var URL = "https://restcountries.eu/rest/v2/name/" + name;
    }
    //Fetch URL
    console.log("Fetching URL: " + URL);
    return fetch(URL)
      .then(res => res.json())
      .then(res => {
        //console.log(JSON.stringify(res));
        console.log("Total records found: " + res.length);
        const countryData = [];
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
      .catch(err => console.error("Error: " + err));
  }
};

//restCountries.getCountriesByName("venezuela");

export default countries;
