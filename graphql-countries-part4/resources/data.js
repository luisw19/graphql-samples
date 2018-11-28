// add this import at the top
import fetch from 'node-fetch';
//Library with utilities to deal with arrays and more (see https://colintoh.com/blog/lodash-10-javascript-utility-functions-stop-rewriting)
import _ from 'lodash';
//used to screen scrap the google search response
import cheerio from 'cheerio';

//lib to write response to files
import fs from 'fs';

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
          var xrateTo = "EUR";
          if (args.xrateTo != undefined) {
            //if name argument is received, search country by name
            xrateTo = args.xrateTo;
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
              xrateTo: xrateTo,
              xrate: 0
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

//Conversion function to fetch a conversion rate. This the below code is commented as exchangeratesapi doesn't convert all currencies
/*var conversion = {
  convert(base,to) {
    //Paste a RequestBin generated URL here.
    var URL = "https://exchangeratesapi.io/api/latest?base=" + base + "&symbols=" + to;
    console.log("Calling: " + URL);
    //return fetch(URL, { method: 'POST', body:  country})
    return fetch(URL)
      //returns with a promise
      .then(res => res.json())
      //once promised is fullfiled then httpbin just returns the same payload we've sent
      .then(res => {
        //if response is OK, then we just send back same input
        console.log(JSON.stringify(res));
        return res.rates[to];
      })
      //catch errors if any
      .catch(err => console.error("Error: " + err));
  }
};*/

//Exchange rate conversion function based on screen scraping a google search
var conversion = {
  convert(base,to) {
    if(base==to){
      return 1;
    };
    //Paste a RequestBin generated URL here.
    var URL = "https://www.google.co.uk/search?q=" + base + "+to+" + to;
    console.log("Calling: " + URL);
    //Note that is requiredto add the user-agent header as otherwise google search response won't include a specific HTML tag ID for the conversion rate
    return fetch(URL, {headers: {
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36"
        }})
      //returns with a promise
      .then(res => res.text())
      //once promised is fullfiled then httpbin just returns the same payload we've sent
      .then(res => {
        //Use cheerio to screen scrap the HTML response
        var $ = cheerio.load(res);

        //write response to write
        /*
        fs.writeFile('response.html', res, (err) => {
          if (err) {
            console.error(err)
            return
          }
          //file written successfully
        })*/



        //The tag Id "knowledge-currency__tgt-amount" is where google places the conversion rate.
        //var conversion = $('#knowledge-currency__tgt-amount').text();
        // ^^ not longer working

        //get response in string
        var stringConversion = $('.dDoNo').text();
        //remove strings and keep numbers
        var conversion = parseFloat(stringConversion.replace( /[^\d\.]*/g, ''));
        //log response
        console.log(conversion);

        return conversion;
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
