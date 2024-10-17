import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

export default function Data() {
  const paperStyle = { padding: '270px 5px', width: 600, margin: '2px auto' };

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]); // State to hold the fetched data

  // Function to handle POST request (Submit data)
  const addData = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const newData = { name, age, email }; // Assuming 'name', 'age', and 'email' are defined

    console.log(newData);

    // Responsible for connecting to the database and submitting the data
    fetch("http://localhost:8080/api/v1/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then(() => {
        console.log("New data added");
      })
      .catch((error) => {
        console.error("Error adding data:", error); // Catch any errors in the fetch request
      });
  };

  // Function to handle GET request (Fetch data)
  const seeData = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const queryParams = new URLSearchParams({ name, age, email }).toString();

    fetch(`http://localhost:8080/api/v1/customers?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((fetchedData) => {
        console.log("Fetched data:", fetchedData);
        setData(fetchedData); // Store fetched data in state
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Catch any errors in the fetch request
      });
  };

  
  return (
    <Container>
      <Paper elevation={10} style={paperStyle}>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Age"
            variant="standard"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />

          <Button variant="contained" onClick={addData}>Submit</Button>
          <Button variant="contained" onClick={seeData}>Get Data</Button><br />
        </Box>
      </Paper>

      {/* Displaying the fetched data */}
      <Paper elevation={3} style={paperStyle}>
        {data.length > 0 ? (
          data.map((item) => (
            <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={item.id}>
              Id: {item.id}
              <br />
              Name: {item.name}
              <br />
              Age: {item.age}
              <br />
              Email: {item.email}
            </Paper>
          ))
        ) : (
          <p>No data available</p>
        )}
      </Paper>
    </Container>
  );
}
