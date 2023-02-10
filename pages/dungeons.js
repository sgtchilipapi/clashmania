import * as React from 'react';
import Router from 'next/router'
import { useAccount } from 'wagmi'

import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Grid, Button, Typography } from '@mui/material';
import EquipmentList from '../components/equipments/equipmentList';
import LoadingBackdrop from '../components/backdrop';
import ConnectButton from '../components/wallet/connectButton';
import DungeonList from '../components/dungeons/dungeonsList';

import * as s_apis from "../clashmania-contracts/api/subgraphs/subgraphs-api"
import * as dungeons_lib from "../components/library/dungeonsLib"

export default function FixedContainer(props) {
    const { address } = useAccount()
    const [isLoading, setIsLoading] = React.useState(false)
    const [loadingText, setLoadingText] = React.useState('loading data...')

    const dungeons = [0, 1, 2]

    React.useEffect(() => {

    }, [, address])

    // const findBattleButton = (
    //     address ? props.characterSelected ? <Button variant='outlined' sx={{ mt: 2 }}>Find Battle</Button> :
    //         <Button onClick={() => Router.push('/characters')} variant='outlined' sx={{ mt: 2 }}>Select Character</Button> :
    //         <ConnectButton />
    // )

    return (
        <React.Fragment>
            <CssBaseline />
            <LoadingBackdrop isLoading={isLoading} loadingText={loadingText} />
            <Box sx={{ bgcolor: '#cfe8fc', height: `${dungeons.length < 10 ? 100 : (dungeons.length * 10)}vh`, color: 'primary.main' }}>
                <Container fixed justify="center" align="center" maxWidth='xs'>
                    <Box sx={{ bgcolor: '#cfe8fc', height: `${dungeons.length < 10 ? 100 : (dungeons.length * 10)}vh`, color: 'primary.main' }}>
                        <Typography variant='h6' sx={{ mb: 1 }}>THE DUNGEONS</Typography>
                        <Grid container align='center' justify='center' sx={{mb:2}}>
                            <Grid item container xs={12}>
                                <DungeonList
                                    dungeons={dungeons}
                                    setDungeonSelected={props.setDungeonSelected}
                                />
                            </Grid>
                        </Grid>
                        {address ? '':<ConnectButton />}
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    );
}