import React, { useEffect, useState } from 'react';
import { Table, Container, Button, Form, Row, Col } from 'react-bootstrap';

function DataTable() {
  const [show, setShow] = useState(false);
  const [yelpdata, setYelpData] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [stars, setStars] = useState('');
  const [review_count, setReview_count] = useState('');
  const [postal_code, setPostal_code] = useState('');
  const [statesList, setStatesList] = useState([]);

  const starlist = [1, 2, 3, 4, 5];

  useEffect(() => {
    // Fetch states, cities, and postal codes from the backend
    const fetchDataList = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/fetchdatalist');
        if (!response.ok) {
          throw new Error("Can't get data from the database...");
        }
        const data = await response.json();
        const stateList = data.data.map((item) => item.state);
        console.log(stateList);
        
        setStatesList(stateList.sort());
      } catch (error) {
        console.error(error);
      }
    };
    

    fetchDataList();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const clearFilters = () =>{
    setCity('');
    setName('');
    setStars('');
    setState('');
    setPostal_code('');
    setReview_count('');
    
  };
  const handleShow = () => {
    setShow(true);
    fetchFilterData();
  };

  const clearTable = () => {
    setShow(false);
    setYelpData([]);
    setPage(1);
  };

  const fetchFilterData = async () => {
    try {
      const queryParams = {
        name: name,
        city: city,
        state: state,
        stars: stars,
        review_count: review_count,
        postal_code: postal_code,
        page: page,
      };

      const queryString = new URLSearchParams(queryParams).toString();
      const response = await fetch(`http://localhost:8000/api/filterdata?${queryString}`);

      if (!response.ok) {
        console.log(response);
        throw new Error("Can't get data from the database...");
      }

      const data = await response.json();
      const converted = [data.data];

      console.log(converted);
      setYelpData((prevdata) => [...prevdata, ...converted[0]]);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterChange = (event) => {
    setShow(false);
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'state':
        setState(value);
        break;
      case 'stars':
        setStars(value);
        break;
      case 'review_count':
        setReview_count(value);
        break;
      case 'postal_code':
        setPostal_code(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    setShow(true);
    event.preventDefault();
    fetchFilterData();
  };

  return (
    <Container style={{ marginTop: '50px', marginBottom: '50px' }}>
      {!show ? (
        <Button
          onClick={handleShow}
          style={{
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          Show Data
        </Button>
        
      ) : null}
      {!show && (
        <Form onSubmit={handleSubmit}>

          <Row>
            <Col>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={name}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type='text' 
                  name="city"
                  placeholder='Enter City'
                  value={city}
                  onChange={handleFilterChange}
                >
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
  as="select"
  name="state"
  value={state}
  onChange={handleFilterChange}
>
  <option value="">Select State</option>
  {statesList.map((data) => (
    <option key={data} value={data}>
      {data}
    </option>
  ))}
</Form.Control>

              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formStars">
                <Form.Label>Stars</Form.Label>
                <Form.Control
                  as="select"
                  name="stars"
                  value={stars}
                  onChange={handleFilterChange}
                >
                  <option value="">Any</option>
                  {starlist.map((star) => (
                    <option key={star} value={star}>
                      {star}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formReviewCount">
                <Form.Label>Review Count</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter review count"
                  name="review_count"
                  value={review_count}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPostal_code">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Zip Code"
                  name="Postal Code"
                  value={postal_code}
                  onChange={handleFilterChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <div style={{marginTop:'10px',justifyContent:'space-between',display:'flex'}}>
          <Button variant="primary" type="submit">
            Filter
          </Button>
          <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        </Form>
      )}

      {show && yelpdata.length > 0 ? (
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
                      <td>{index + 1}</td>
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '10px',
              }}
            >
              <Button onClick={fetchFilterData}>+ Show More</Button>
              <Button onClick={clearTable}>Clear Table</Button>
            </div>
          )}
        </div>
      ) : null}
    </Container>
  );
}

export default DataTable;
