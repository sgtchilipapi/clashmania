import * as React from 'react';
import Router from 'next/router'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import { Button, Typography } from '@mui/material';

import LoadingBackdrop from '../components/backdrop';
import ConnectButton from '../components/wallet/connectButton';
import TokenList from '../components/wallet/tokenList';


export default function Wallet() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [loadingText, setLoadingText] = React.useState('loading data...')
    return (

        <React.Fragment>
            <CssBaseline />
            <LoadingBackdrop isLoading={isLoading} loadingText={'Fetching your token balances...'} />
            
            <Box sx={{ bgcolor: '#cfe8fc', height: '200vh', color: 'primary.main' }}>
                <Container fixed justify="center" align="center" maxWidth='xs'>
                    <Box sx={{ bgcolor: '#cfe8fc', height: '200vh', color: 'primary.dark' }} justify="center" align="center">
                    <Typography variant='h6'>YOUR WALLET BALANCES</Typography>
                        <Grid container>
                            <Grid item xs={12}>
                                <ConnectButton />
                            </Grid>
                            <Grid item xs={12} sx={{mt:2}}>
                                <TokenList 
                                    setIsLoading={setIsLoading}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    );
}