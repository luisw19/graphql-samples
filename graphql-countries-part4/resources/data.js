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
  getCountriesByName(args) {
    //By default all countries are fetch if no arguments are received
    var URL = "https://restcountries.eu/rest/v2/all/";
    if (args.name != undefined) {
      //if name argument is received, search country by name
      var URL = "https://restcountries.eu/rest/v2/name/" + args.name;
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
          //Define conversion value
          var conversionTo = "USD";
          if (args.conversionTo != undefined) {
            //if name argument is received, search country by name
            conversionTo = args.conversionTo;
          }
          //set response JSON
          countryData[key] = {
            id: value.numericCode,
            name: value.name,
            code: value.alpha3Code,
            capital: value.capital,
            region: value.region + " | " + value.subregion,
            currency: {
              name: value.currencies[0].name,
              code: value.currencies[0].code,
              symbol: value.currencies[0].symbol,
              conversion: conversionTo,
              rate: 0
            },
            language: value.languages[0].name + " (" + value.languages[0].iso639_2 + ")"
          };

        });
        return countryData;
      })
      //catch errors if any
      .catch(err => console.error("Error: " + err));
  }
};

//Simulation of a HTTP POST
var country = {
  upsertCountry(body) {
    //Paste a RequestBin generated URL here.
    var URL = "http://localhost:8000/18mo63u1";
    console.log("Posting to URL " + URL + " the following payload: " + JSON.stringify(body));
    //return fetch(URL, { method: 'POST', body:  country})
    return fetch(URL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      //returns with a promise
      .then(res => res.text())
      //once promised is fullfiled then httpbin just returns the same payload we've sent
      .then(res => {
        //if response is OK, then we just send back same input
        console.log(res);
        return body.input;
      })
      //catch errors if any
      .catch(err => console.error("Error: " + err));
  }
};

//Conversion function to fetch a conversion rate
var conversion = {
  convert(to) {
    //Paste a RequestBin generated URL here.
    var URL = "http://free.currencyconverterapi.com/api/v5/convert?q=" + to + "&compact=y";
    console.log("Posting to URL " + URL + " the following payload: " + JSON.stringify(to));
    //return fetch(URL, { method: 'POST', body:  country})
    return fetch(URL)
      //returns with a promise
      .then(res => res.json())
      //once promised is fullfiled then httpbin just returns the same payload we've sent
      .then(res => {
        //if response is OK, then we just send back same input
        console.log(res[to].val);
        return JSON.stringify(res[to].val);
      })
      //catch errors if any
      .catch(err => console.error("Error: " + err));
  }
};


export {
  countries,
  country,
  conversion
};
