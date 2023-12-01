import React from 'react';
import { useState,useEffect,useCallback } from 'react';
import { Container,Form,Card } from 'react-bootstrap';

function SearchFilter() {
const [states,setStates] = useState([]);
const [categories,setCategories] = useState([]);
const [zipCode,setZipCode] = useState([]);
const [stars,setStars] = useState([]);
const [city,setCity] = useState([]);

const fetchData = async () =>{
  try{
   const response = await fetch(`http://localhost:8000/api/filterdata`);

    if(!response.ok)
    throw new Error("Failed to fetch filtered data...");

    const filtered_data = await response.json();

    const {city, state, zipCode, stars, categories} = filtered_data;

    setStars(stars);
    setStates(state);
    setZipCode(zipCode);
    setCity(city);
    setCategories(categories);


  }
  catch(err){
    console.error(err);
  }
};

useEffect(()=>{
  fetchData();
},[])

return (
<Container style={{display:'flex', alignItems:'center';}}>
{}
</Container>  )
}
export default SearchFilter;