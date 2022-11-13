import * as React from 'react';
import Link from 'next/link';
import { useAccount } from 'wagmi'

import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Grid, Button, Typography } from '@mui/material';
import EquipmentList from '../components/equipments/equipmentList';
import LoadingBackdrop from '../components/backdrop';
import ConnectButton from '../components/wallet/connectButton';

import * as s_apis from "../random-clash-contracts/api/subgraphs/subgraphs-api"
import * as dungeons_lib from "../components/library/dungeonsLib"


export default function FixedContainer(props) {
    const { address } = useAccount()
    const [isLoading, setIsLoading] = React.useState(false)
    const [loadingText, setLoadingText] = React.useState('loading data...')
    const dungeons = dungeons_lib.dungeons

    React.useEffect(() => {
        
    }, [, address])

    const findBattleButton = (
        address ? <Button variant='outlined' sx={{ mt: 2 }}>Find Battle</Button> :
            <ConnectButton />
    )

    return (
        <React.Fragment>
            <CssBaseline />
            <LoadingBackdrop isLoading={isLoading} loadingText={loadingText} />
            <Box sx={{ bgcolor: '#cfe8fc', height: `${dungeons.length < 10 ? 100 : (dungeons.length * 10)}vh`, color: 'primary.main' }}>
                <Container fixed justify="center" align="center" maxWidth='xs'>
                    <Box sx={{ bgcolor: '#cfe8fc', height: `${dungeons.length < 10 ? 100 : (dungeons.length * 10)}vh`, color: 'primary.main' }}>
                        <Typography variant='h6' sx={{ mb: 1 }}>THE DUNGEONS</Typography>
                        <Grid container align='center' justify='center'>
                            <Grid item container xs={12}>
                                {/* <EquipmentList
                  equipments={equipments}
                  setEquipmentSelected={props.setEquipmentSelected}
                  setEquipmentOpenDialog={props.setEquipmentOpenDialog}
                /> */}
                            </Grid>
                        </Grid>
                        {findBattleButton}
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    );
}