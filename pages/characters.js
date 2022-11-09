import * as React from 'react';
import Link from 'next/link';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';

import * as s_apis from "../random-clash-contracts/api/subgraphs/subgraphs-api"


export default function FixedContainer() {
  React.useEffect(()=>{
    getCharactersOwned()
  }, [])

  const getCharactersOwned = async () => console.log(await s_apis.core.ctrs.getCharactersOwned(localStorage.getItem('wallet')))

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
            <Link href="/characterMinter"><Button>Create Character</Button></Link>
        </Box>
      </Container>
    </React.Fragment>
  );
}