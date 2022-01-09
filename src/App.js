import { Card, CardContent, FormControl, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './util';
import './App.css';
import LineGraph from './LineGraph';

function App() {
  const [countries, setCountries] = useState([]); 
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(respose => respose.json())
    .then(data => {
      setCountryInfo(data);
    })
  })

  useEffect(() => {
    // The code inside here will run once when the component loads and not again
    // It also reloads when value in the square bracket changes
    // async -> send a request, wait for it, do something with it
    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country, // United State, Myanmar
            value: country.countryInfo.iso2 // USA, MMR
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
      });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode); //changed country selected
      setCountryInfo(data);
    })
  };
  
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
        <h1>COVID-19 Tracker</h1>
          <FormControl className='app__dropdown'>
            <Select variant='outlined' onChange={onCountryChange} value={country}>
            
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) =>(
                <MenuItem value ={country.value}>{country.name}</MenuItem>
              ))}

              {/* <MenuItem value="worldwide">WorldWide</MenuItem>
              <MenuItem value="worldwide">Option 2</MenuItem> */}

            </Select>
          </FormControl>
        </div>
      
        <div className="app__stats">
              <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
              <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
              <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>
        <Map/>
      </div>

      <Card className="app__right">
        <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData}/>
            <h3>Worldwide new cases</h3>
            <LineGraph />

        </CardContent>
      </Card>
    </div>
  );
}

export default App;
