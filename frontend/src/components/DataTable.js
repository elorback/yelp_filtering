import React from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { useState } from 'react';

function DataTable() {
  const [name, setName] = useState([]);
  const [address, setAddress] = useState([]);
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [postal_code, setPostalCode] = useState([]);
  const [stars, setStars] = useState([]);
  const [review_count, setReviewCount] = useState([]);
  const [categories, setCategories] = useState([[]]);
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/fetchdata', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        console.log(response);
        throw new Error("Can't get data from the database...");
      }
  
      const data = await response.json();
  console.log(typeof(data))
        // If data is an object with properties, handle it accordingly
        setName(data.name);
        setAddress(data.address);
        setCity(data.city);
        setState(data.state);
        setPostalCode(data.postal_code);
        setStars(data.stars);
        setReviewCount(data.review_count);
        setCategories(data.categories);

        console.log(data);
   
      
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <>
      <Container>
        <Button onClick={handleShow}>Show Data</Button>
        {show ? (
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Postal Code</th>
                <th>Stars</th>
                <th>Review Count</th>
                <th>Categories</th>
              </tr>
            </thead>
            <tbody>
              {name !== null
                ? name.map((value, index) => (
                    <tr key={index}>
                      <td>{value}</td>
                      <td>{address[index]}</td>
                      <td>{city[index]}</td>
                      <td>{state[index]}</td>
                      <td>{postal_code[index]}</td>
                      <td>{stars[index]}</td>
                      <td>{review_count[index]}</td>
                      <td>{categories[index]}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        ) : null}
      </Container>
    </>
  );
}

export default DataTable;
