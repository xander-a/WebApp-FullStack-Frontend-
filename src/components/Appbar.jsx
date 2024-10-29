import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';



export default function Appbar() {
  return (
    <Box sx={{ flexGrow: 1, width: '100vw' }}>
      <AppBar position="static" sx={{ bgcolor: 'black' }}>
        <Toolbar sx={{ width: '100%' }}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            To-Do Application
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
