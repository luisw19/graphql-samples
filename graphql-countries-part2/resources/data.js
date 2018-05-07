// add this import at the top
import fetch from 'node-fetch';

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
    return fetch('https://restcountries.eu/rest/v2/name/' + name)
    	.then(res => res.json() )
      .then(raw => {
        //now we map the response to a format that matches that defined in the Query operation ([Countries])
        const countryData = [{
          id: raw[0].numericCode,
          name: raw[0].name,
          code: raw[0].alpha3Code
        }];
        return countryData;
      })
      .catch(err => console.error("Error: " + err));
  }
};

//restCountries.getCountriesByName("venezuela");

export default countries;
