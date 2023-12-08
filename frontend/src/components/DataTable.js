import React, { useState } from 'react';
import { Table, Container, Button } from 'react-bootstrap';

function DataTable() {
  const [show, setShow] = useState(false);
  const [yelpdata, setYelpData] = useState([]);

  const handleShow = () => {
    setShow(!show);
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/fetchdata');
  
      if (!response.ok) {
        console.log(response);
        throw new Error("Can't get data from the database...");
      }
  
      const data = await response.json();
      const converted = [...yelpdata,data.data]
      console.log(converted[0])
      setYelpData(converted[0]); // Corrected this line
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <>
      <Container>
        {!show ? <Button onClick={handleShow}>Show Data</Button> : null}
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
              {yelpdata !== null
                ? yelpdata.map((data, index) => (
                    <tr key={index}>
                      <td>{data.name || ''}</td>
                      <td>{data.address || ''}</td>
                      <td>{data.city || ''}</td>
                      <td>{data.state || ''}</td>
                      <td>{data.postal_code || ''}</td>
                      <td>{data.stars || ''}</td>
                      <td>{data.review_count || ''}</td>
                      <td>{data.categories || ''}</td>
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
