import React, { useState } from 'react';
import { Table, Container, Button } from 'react-bootstrap';

function DataTable() {
  const [show, setShow] = useState(false);
  const [yelpdata, setYelpData] = useState([]);
  const [page,setPage] = useState(2);

  const handleShow = () => {
    setShow(!show);
    fetchData();
  };
  const showMore = () =>{
    fetchData();
  }
  const clearTable = ()  =>{

      setShow(false);
      setYelpData([]);
      setPage(2);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/fetchdata?page=${page}`);
  
      if (!response.ok) {
        console.log(response);
        throw new Error("Can't get data from the database...");
      }
  
      const data = await response.json();
      const converted = [data.data]
      console.log(converted[0])
      setYelpData((prevdata) =>[...prevdata,...converted[0]]); // Corrected this line
      setPage((prevPage)=>(prevPage + 1));
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <>
      <Container style={{justifyContent:'center', display:'flex',alignItems:'center'}}>
        {!show ? 
        <Button onClick={handleShow} 
              style={{
        justifyContent:'center',
         display:'flex',
         alignItems:'center', 
         marginTop:'150px'}}
         >Show Data</Button> : null}
        {/* {!show ? null:<Button onClick={showMore}>Show More Data</Button>} */}
        {show && yelpdata.length > 0? (
          <div>
          <Table>
            <thead>
              <tr>
                <th>Data Point</th>
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
                      <td>{index+1}</td>
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

          {yelpdata.length > 0 && (
              <div style={
                { 
                 display: 'flex',
                 justifyContent: 'space-between',
                 marginTop: '10px' }
                }>

                  <Button onClick={showMore}>+ Show More</Button>
                  <Button onClick={clearTable}>Clear Table</Button>
              </div>
          )}
          </div>
        ) : null}
      </Container>
    </>
  );
}

export default DataTable;
