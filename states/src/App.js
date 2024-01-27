import axios from "axios";
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  const[select , setSelected] = useState({
    selectcountry : "Select Country",
    selectstate : "Select State",
    selectcity : "Select City"

  });
  const[countrylist ,setCountryList] = useState([]);
  const[statelist ,setStateList] = useState([]);
  const[citylist ,setCityList] = useState([]);

  const fetchlist= async(endpointurl)=>{

    try{
      console.log(endpointurl);
      const apidata = await axios.get(`${endpointurl}`);
      return apidata.data;

    }catch(e){
      console.log(e.message)
    }
  }

  useEffect(()=>{
    fetchlist("https://crio-location-selector.onrender.com/countries")
    .then((countrylist)=>{
  //    let uniqueArray = countrylist.filter(function(item, pos) {
  //     const a = item.trim();
  //     return countrylist.indexOf(a) === pos;
  // })

  //     setCountryList(uniqueArray);
         setCountryList(countrylist);
    })
    .catch((e)=>{
      console.log(e.message)
    })
  },[]);

  useEffect(()=>{

    if(select.selectcountry !=="Select Country"){
      


      fetchlist(`https://crio-location-selector.onrender.com/country=${select.selectcountry}/states`)
    .then((statelist)=>{
      console.log(statelist);
      setStateList(statelist);
    })
    .catch((e)=>{
      console.log(e.message)
    })

    }

    if(select.selectcountry ==="Select Country"){
      setStateList([]);
      select.selectstate ="Select State"
    }

    if(select.selectstate !=="Select State" && select.selectstate !=="N/A"){
      fetchlist(`https://crio-location-selector.onrender.com/country=${select.selectcountry}/state=${select.selectstate}/cities`)
    .then((citylist)=>{
      console.log(citylist);
      setCityList(citylist);
    })
    .catch((e)=>{
      console.log(e.message)
    })

    }

    if(select.selectstate ==="Select State"){
      setCityList([]);
      select.selectcity ="Select City"
    }

  },[select.selectcountry ,  select.selectstate]);



  const handleselect =(event)=>{
    const name = event.target.name;
    const value = event.target.value;

    if(name ==="selectcountry"){
      setStateList([]);
      select.selectstate ="Select State"
    }
    setSelected((values)=> ({...values, [name]:value}));
  }




  return (
    <div className="App">
      <h1>Select Location</h1>
      <select className ="countrydropdown"
            disabled={false}
            name="selectcountry"
            value={select.selectcountry}
            onChange={handleselect}
            
        >
          <option>Select Country</option>
          {countrylist.length !==0 && countrylist.map((item) => (
            <option >
                {item}
            </option>
            ))}
            
        </select>

        <select className ="dropdown"
            disabled={select.selectcountry !=="Select Country" ? false:true}
            name="selectstate"
            value={select.selectstate}
            onChange={handleselect}
            
        >
          <option>Select State</option>
          {statelist.length !==0 && statelist.map((item) => (
            <option >
                {item}
            </option>
            ))}
            
        </select>

        <select className ="dropdown"
            disabled={select.selectstate !=="Select State" ? false:true}
            name="selectcity"
            value={select.selectcity}
            onChange={handleselect}
            
        >
          <option>Select City</option>
          {citylist.length !==0 && citylist.map((item) => (
            <option >
                {item}
            </option>
            ))}
            
        </select>

        {select.selectcity !=="Select City" &&<h4>You Selected {select.selectcity}, {select.selectstate}, {select.selectcountry}</h4>}
    </div>
  );
}

export default App;
