import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';


export default function Data() {
  const paperStyle = { margin: '10px', padding: '15px' };

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]); // State to hold the fetched data
  const [nextIdToDelete, setNextIdToDelete] = useState(1);

  // Function to handle POST request (Submit data)
  const addData = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const newData = { name, age, email }; // Assuming 'name', 'age', and 'email' are defined francis

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

// Function to Delete Mapping
  

  const deleteData = (userID) => {
    fetch(`http://localhost:8080/api/v1/customers/${userID}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log(`User with ID ${userID} deleted`);
          // Increment nextIdToDelete
          setNextIdToDelete((prevId) => prevId + 1);
        } else {
          console.log("Failed to delete user");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDeleteClick = () => {
    deleteData(nextIdToDelete);
  };

return (
  <ThemeProvider
    theme={createTheme({
      palette: {
        primary: {
          main: '#007FFF',
          dark: '#0066CC',
        },
      },
    })}
  >
    {/* <Container maxWidth="lg"> */}
      {/* Scrollable Form Section */}
<Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
  {/* Scrollable Form Section */}
  <Box
    sx={{
      overflowY: 'hidden',
      height: '300px', // Adjust height as needed
      width: '500px',
      bgcolor: 'white',
      padding: 2,
      borderRadius: 3,
      boxShadow: 1,
      mt: 2,
      display: 'flex',
      flexDirection: 'column', // Stack children vertically
      alignItems: 'center', // Center items horizontally
    }}
  >
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ width: '100%' }} // Make inner box take full width
    >
      <TextField
        id="name"
        label="Name"
        variant="standard"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        id="age"
        label="Age"
        variant="standard"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        id="email"
        label="Email"
        variant="standard"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={addData} sx={{ mt: 1, ml: 1 }}>
        Submit
      </Button>
      <Button variant="contained" onClick={seeData} sx={{ mt: 1, ml: 1 }}>
        Get Data
      </Button>
      <Button variant="contained" onClick={handleDeleteClick} sx={{ mt: 1, ml: 1 }}>
        Delete Data
      </Button>
    </Box>
  </Box>
</Container>

<Container maxWidth="lg">
  {/* Scrollable Data Display Section */}
  <Box
    sx={{
      overflowY: 'scroll',
      height: '500px', // Adjust height as needed
      bgcolor: 'white',
      padding: 0,
      borderRadius: 3,
      boxShadow: 1,
      transform: 'translateY(-80px)', // Move up by 10 pixels
    }}
  >
    <Paper elevation={3} style={paperStyle}>
      {data.length > 0 ? (
        data.map((item) => (
          <Paper
            elevation={6}
            style={{ margin: '10px', padding: '15px', textAlign: 'left' }}
            key={item.id}
          >
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
  </Box>
</Container>

  </ThemeProvider>
);
}