import React , {useState, useEffect} from 'react';
import './css/app.css';
import Header from './components/Header'
import {sortData} from './util/sort'
import Map from './components/Map';
import Table from './components/Table';
import Graph from './components/Graph';
import { Card, CardContent } from '@material-ui/core';
import Info from './components/Info'

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [data, setData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lon: -40.4796})
  const [mapZoom, setZoom] = useState(3)
  const [mapCountries, setmapCountries] = useState([]);
  const [caseType, setCaseType] = useState("cases")


  useEffect(() =>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(res => res.json())
    .then(data => {
      setData(data)
    })
    .catch(err => {
      console.log(err)
    })
  })

  

  useEffect(() => {
    //the code inside here will run once
    const getData = async () => {
     await  fetch("https://disease.sh/v3/covid-19/countries").then((res)=> 
       {
        
        return res.json()
        }
     ).then(data => {
      
       const countries  = data.map((country) =>  ({
         name: country.country,
         value: country.countryInfo.iso2,
       }))

       const sortedData = sortData(data);
       setCountries(countries);
       setTableData(sortedData);
       setmapCountries(data)
    }).catch((err) => {
       console.log(err)
     })
    }
    getData()

}, []);

const onChange = async (e) => {
const countryCode = e.target.value;
setCountry(countryCode)
console.log(countryCode);
const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all":
 `https://disease.sh/v3/covid-19/countries/${countryCode}`;

await fetch(url)
.then(res => res.json())
.then(data => {
   setData(data)
   setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
   setZoom(5);
})
.catch(err => {
  console.log(err)
})



}

  return (
    <div className="app">
      <div className="app__left">
          {/* header */}
          <Header countries={countries} country={country} onChange={onChange}/>

          {/* info boxes */}
          {/* <AppStats/> */}
          <div className="app__stats">
            <Info onClick= {e => {setCaseType("cases")}} title="Coronavirus Cases" cases={data?.todayCases} total={data?.cases}/>
            <Info onClick= {e => {setCaseType("recovered")}} title="Recovered"   cases={data?.todayRecovered} total={data?.recovered}/>
            <Info onClick= {e => {setCaseType("deaths")}} title="Deaths"  cases={data?.todayDeaths} total={data?.deaths}/>
            </div>
          {/* map */}
          <Map casesType={caseType} center={mapCenter} countries={mapCountries} zoom={mapZoom}/>
      </div>

      <Card  className="app__right">
         <CardContent>
           <h3>Live Cases by Country</h3>
            {/* table */}
            <Table data={tableData}/>
          
           <h3>WorldWide new cases</h3>
           {/* graph */}
           <Graph casesType={caseType}/>
         </CardContent>
      </Card>
    
    </div>
  );
}

export default App;
