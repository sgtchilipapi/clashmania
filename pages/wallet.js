import * as React from 'react';
import Router from 'next/router'
import CssBaseline from '@mui/material/CssBaseline';

import { Button, Typography, Grid, Box, Container } from '@mui/material';

import LoadingBackdrop from '../components/backdrop';
import ConnectButton from '../components/wallet/connectButton';
import TokenList from '../components/wallet/tokenList';
import FarmList from '../components/wallet/farmList';
import LpStake from '../components/wallet/lpStake';

export default function Wallet() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [loadingText, setLoadingText] = React.useState('loading data...')
    const [lpStakeOpen, setLpStakeOpen] = React.useState(false)
    return (

        <React.Fragment>
            <CssBaseline />
            <LoadingBackdrop isLoading={isLoading} loadingText={'Fetching your token balances...'} />
            
            <Box sx={{ bgcolor: '#cfe8fc', height: '200vh', color: 'primary.main', backgroundImage: "url('/images/backgrounds/wallet.png')", backgroundSize: "cover" }}>
                <Container fixed justify="center" align="center" maxWidth='xs'>
                    <Box sx={{ bgcolor: 'none', height: '200vh', color:'primary.main', textShadow:'2px 2px #ffffff' }} justify="center" align="center">
                    <Typography variant='h6'>YOUR WALLET BALANCES</Typography>
                        <Grid container>
                            <Grid item xs={12}>
                                <ConnectButton />
                            </Grid>
                            <Grid item xs={12} sx={{mt:2}}>
                                <TokenList 
                                    setIsLoading={setIsLoading}
                                    setLoadingText={setLoadingText}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{mt:2}}>
                                <FarmList 
                                    setIsLoading={setIsLoading}
                                    setLpStakeOpen={setLpStakeOpen}
                                    setLoadingText={setLoadingText}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
            <LpStake
                lpStakeOpen={lpStakeOpen}
                setLpStakeOpen={setLpStakeOpen}
                setLoadingText={setLoadingText}
            />
        </React.Fragment>
    );
}