import axios from "axios";
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  const[select , setSelected] = useState({
    selectcountry : "Select Country",
    selectstate : "Select state",
    selectcity : "select City"

  });
  const[countrylist ,setCountryList] = useState([]);
  const[statelist ,setStateList] = useState([]);
  const[citylist ,setCityList] = useState([]);

  const fetchcountrylist=()=>{
    axios.get(`https://crio-location-selector.onrender.com/countries`)
    .then((response )=>{
      setCountryList(response);
    })
    .catch((e)=>{
      console.log(e.message)
    })
  }

  useEffect(()=>{
     fetchcountrylist();
  },[])
  return (
    <div className="App">
      <h1>Select Location</h1>
      <select className ="countrydropdown"
            disabled={false}
            
        >
          <option>Select Country</option>
          {countrylist.map((item) => (
            <option >
                {item}
            </option>
            ))}
            
        </select>
    </div>
  );
}

export default App;
