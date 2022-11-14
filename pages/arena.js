import * as React from 'react';
import Router from 'next/router'
import { useAccount } from 'wagmi'

import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Grid, Button, Typography } from '@mui/material';
import EquipmentList from '../components/equipments/equipmentList';
import LoadingBackdrop from '../components/backdrop';
import ConnectButton from '../components/wallet/connectButton';

export default function FixedContainer(props) {

    return (
        <React.Fragment>
            <CssBaseline />
            {/* <LoadingBackdrop isLoading={isLoading} loadingText={loadingText} /> */}
            <Box sx={{ bgcolor: '#cfe8fc', height: `100vh`, color: 'primary.main' }}>
                <Container fixed justify="center" align="center" maxWidth='xs'>
                    <Box sx={{ bgcolor: '#cfe8fc', height: `100vh`, color: 'primary.main' }}>
                        <Typography variant='h6' sx={{ mb: 1 }}>THE ARENA</Typography>
                        <Grid container align='center' justify='center' sx={{mb:2}}>
                            <Grid item xs={12}>
                                <Typography variant='body1'>PVP BATTLES COMING SOON!</Typography>
                            </Grid>
                            
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    );
}