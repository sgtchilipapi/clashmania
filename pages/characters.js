import * as React from 'react';
import Link from 'next/link';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Grid, Button, Typography } from '@mui/material';
import CharactersList from '../components/characters/characterList';
import LoadingBackdrop from '../components/backdrop';

import * as s_apis from "../random-clash-contracts/api/subgraphs/subgraphs-api"
import * as c_apis from "../random-clash-contracts/api/contracts/contracts-api"
import { getCharacterImage } from '../components/library/characterDetailsLib';


export default function FixedContainer(props) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [loadingText, setLoadingText] = React.useState('loading data...')

  const [totalOwned, setTotalOwned] = React.useState(0)
  const [characters, setCharacters] = React.useState([])

  React.useEffect(() => {
    getCharactersViaSubgraph()
  }, [])

  const getCharactersViaSubgraph = async () => {
    setIsLoading(true)
    setLoadingText('Loading all of your characters...')
    const data = await s_apis.core.ctrs.getCharactersOwned(localStorage.getItem('wallet'))
    setCharacters(data)
    setIsLoading(false)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <LoadingBackdrop isLoading={isLoading} loadingText={loadingText} />
      <Box sx={{ bgcolor: '#cfe8fc', height: '200vh', color: 'primary.main' }}>
        <Container fixed justify="center" align="center" maxWidth='xs'>
          <Box sx={{ bgcolor: '#cfe8fc', height: '200vh', color: 'primary.main' }}>
            <Typography variant='h6' sx={{ mb: 1 }}>YOUR CHARACTERS</Typography>
            <Grid container align='center' justify='center'>
              <Grid item xs={12}>
                <CharactersList characters={characters} setCharacterSelected={props.setCharacterSelected} setCharacterIcon={props.setCharacterIcon} />
              </Grid>
            </Grid>
            <Link href="/characterMinter"><Button variant='outlined' sx={{ mt: 2 }}>Create New Character</Button></Link>
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
}