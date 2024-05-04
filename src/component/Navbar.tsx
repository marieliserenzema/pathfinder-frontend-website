import React from 'react';
import {
  AppBar, Avatar, Box, Button, Container, IconButton, Toolbar, Tooltip, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePaginatedUserListContext } from '../context/PaginatedUserListContext.tsx';

function Navbar(): React.JSX.Element {
  const { logout } = usePaginatedUserListContext();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  function handleUsers() {
    navigate('/users');
  }

  function handleHikes() {
    navigate('/hikes');
  }

  function handleAlerts() {
    navigate('/alerts');
  }

  return (
    <Box sx={{
      position: 'fixed', width: '100%', zIndex: 1000, top: 0, left: 0,
    }}
    >
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              PATHFINDER
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={handleUsers}
              >
                Utilisateurs
              </Button>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={handleHikes}
              >
                Randonnées
              </Button>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={handleAlerts}
              >
                Alertes
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Déconnexion">
                <IconButton onClick={handleLogout} sx={{ p: 0 }}>
                  <Avatar alt="Admin" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Navbar;
