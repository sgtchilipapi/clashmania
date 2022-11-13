import * as React from 'react';
import Link from 'next/link'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import BoltIcon from '@mui/icons-material/Bolt';
import Router from 'next/router'

function ResponsiveAppBar(props) {
  const handleClick = () => Router.push(props.characterSelected ? '/characterDetails': '/characters')
  return (
    <AppBar position="static" sx={{ backgroundColor: 'info.dark' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/"><BoltIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /></Link>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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

              RC

          </Typography>

          <Link href="/"><BoltIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /></Link>

          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >

              RC

          </Typography>


          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="View Character Details">
              <IconButton sx={{ p: 0 }} onClick={handleClick}>
                <Avatar alt="Characters" src={props.characterIcon} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;