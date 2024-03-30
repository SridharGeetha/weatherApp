import './App.css'

import searchIcon from './assets/search.png';
import rainImg from './assets/rain.png';
import clearIng from './assets/clear.png';
import suncloudImg from './assets/suncloud.png';
import { useEffect, useState } from 'react';


const WeatherDetails = ({icon,temp,city,country})=>{
  return(
  <>
    <div className='image'><img src={icon} alt='none'/></div>
    <div className='temp'>{temp}°C</div>
    <div className='city'>{city}</div>
    <div className="country">{country}</div>
   
  </>
  );
};



function App() {
  const api_key = "668dc5966544565021eb978193bcd9e0";
const [icon,setIcon]=useState(clearIng);
const [temp,setTemp]=useState(0);
const [city,setCity]=useState("chennai");
const [country,setCountry]=useState("india");
const [input,setInput]=useState("chennai");

const [notFound,setNotFound]=useState(false);
const [loading,setLoading]=useState(false);
const[error,setError]=useState(false);


const SearchCity = async ()=>{
  setLoading(true);
  setNotFound(false)
  // alert("done!")
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${api_key}&units=Metric`;
  try{
    let res = await fetch(url);
    let data = await res.json();
    if(data.cod === "404"){
      setNotFound(true);
      setLoading(false);
      return;
    }
    setIcon(getWeatherIcon(data.weather[0].main));
    setTemp(data.main.temp)
    setCity(data.name)
    setCountry(data.sys.country)
    
    // console.log("hello")
    console.log(data)
  }catch(err){
    console.error("an error ",err.message)
    setError(true)
  }finally{
    setLoading(false);
  }
}
const handleCity = (e)=>{
  setInput(e.target.value);
}

const handleKeyEnter = (e)=>{
if(e.key=="Enter"){
  SearchCity();
}
}
const getWeatherIcon = (weatherCondition) => {
  switch (weatherCondition) {
    case 'Rain':
      return rainImg;
    case 'Clear':
      return clearIng;
    default:
      return suncloudImg;
  }
}
useEffect((()=>{
  SearchCity();
}),[])
  return (
    <>
    <div className="container">
    <div className='card text-center w-50 mt-3 ' id='cd'>
      <div className="header">Weather-App</div>
      <div className="card-body">
      <div className='input-container mt-2'>
     
      <input className="form-control mr-sm-2" id='inputcity' type="search" placeholder="Search" aria-label="Search" onChange={handleCity}  onKeyDown={handleKeyEnter}/>
      <button className="btn btn-info my-2 my-sm-0" type="submit" onClick={()=>{
        SearchCity()
      }} id='bt'>Search</button>
 
      </div>
      {loading && <p className="wait-message">Please Wait...</p>}
      {notFound && <p className='not-found'>City Not Found</p>}

    {!loading&&!notFound&&<WeatherDetails icon={icon} temp={temp} city={city} country={country} />}
      </div>
      <div className="card-footer" id='header'>
    Powered By sri_idx
  </div>
    </div>
    </div>
    </>
  )
}

export default App
