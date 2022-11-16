import * as React from 'react';
import Router from 'next/router'
import { useAccount } from 'wagmi'

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import { Button, Typography, TextField } from '@mui/material';
import Image from 'next/image'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import LoadingBackdrop from '../components/backdrop';
import BattleReplayDialog from '../components/dungeons/battleReplay';
import ConnectButton from '../components/wallet/connectButton';

import * as c_apis from "../random-clash-contracts/api/contracts/contracts-api"
import * as dungeons_lib from "../components/library/dungeonsLib"


export default function FixedContainer(props) {
    const { address } = useAccount()
    const [tierIndex, setTierIndex] = React.useState(0)
    const [requestExists, setRequestExists] = React.useState(false)
    const [readyToBattle, setReadyToBattle] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [loadingText, setLoadingText] = React.useState('Loading...')
    const [openReplay, setOpenReplay] = React.useState(false)
    const [battleId, setBattleId] = React.useState('')
    const [battleEvents, setBattleEvents] = React.useState({})

    React.useEffect(() => {
        if (address) {
            getRequest()
        }
    }, [, address])

    const prevTier = () => setTierIndex(tierIndex > 0 ? tierIndex => tierIndex - 1 : 0)
    const nextTier = () => setTierIndex(tierIndex < 4 ? tierIndex => tierIndex + 1 : 4)

    const getRequest = async () => {
        setLoadingText('Loading previous battle request...')
        setIsLoading(true)
        const request = await c_apis.core.dungeons.getBattleRequest(address)
        if (parseInt(request.request_id) > 0) {
            if (!request.completed) {
                console.log(request.completed)
                setReadyToBattle(true)
                setRequestExists(false)
                props.setDungeonSelected(parseInt(request.dungeon_type))
                setTierIndex(parseInt(request.tier))
                getFulfillment(request.request_id)
            }else{
                setReadyToBattle(false)
                setRequestExists(false)
            }
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }

    const getFulfillment = async (request_id) => {
        const request = await c_apis.periphery.chainlink.dgns_vrf.getRequestStatus(request_id)
        if (request.fulfilled) {
            setReadyToBattle(true)
            setIsLoading(false)
        } else {
            setIsLoading(true)
            listenToVRF()
        }
    }

    const listenToVRF = async () => {
        setLoadingText('(2/2) Waiting for VRF fulfillment...')
        const contract = await c_apis.periphery.chainlink.dgns_vrf.getListener()
        contract.on("RequestFulfilled", (request_id, numWords, user) => {
            if (user == address) {
                setReadyToBattle(true)
                console.log('Request has been fulfilled by the VRF! The battle is ready to be finalized!')
                contract.removeAllListeners("RequestFulfilled");
                setIsLoading(false)
            }
        })
    }

    const sendRequest = async () => {
        if(props.characterSelected){
            try {
                setLoadingText(`(1/2) Waiting for 'find battle' request confirmation...`)
                setIsLoading(true)
                await c_apis.core.dungeons.findBattle(props.characterSelected, props.dungeonSelected, tierIndex)
                setRequestExists(true)
                listenToVRF()
            }
            catch {
                setIsLoading(false)
                alert('Failed to find battle! You might have already submitted a battle request that should be completed first.')
            }
        }
    }

    const clash = async () => {
        // try {
            setLoadingText('(1/1) Waiting for `clash` transaction confirmation...')
            setIsLoading(true)
            const battle_events = await c_apis.core.dungeons.startBattle()
            setBattleEvents(battle_events)
            setBattleId(battle_events.battle_info.id._hex)
            setRequestExists(false)
            setReadyToBattle(false)
            setIsLoading(false)
            setOpenReplay(true)

            //Show the replay window here
        // }
        // catch {
        //     setIsLoading(false)
        //     alert('Failed to start the battle! You might not have any battle request! Please submit a request first.')
        // }
    }

    const backButton = (
        <Button onClick={() => Router.push('/dungeons')} variant="outlined">Back Away</Button>
    )

    const findBattle = (
        !address ? <ConnectButton /> :
            readyToBattle ? <Button variant="outlined" onClick={clash}>Lets Clash!</Button> :
                props.characterSelected ? <Button variant="outlined" disabled={requestExists} onClick={sendRequest}>Find Battle</Button> :
                    <Button variant="outlined" onClick={()=> {Router.push('/characters')}}>Select Character First</Button>
                
    )

    return (
        <React.Fragment>
            <CssBaseline />
            <LoadingBackdrop isLoading={isLoading} loadingText={loadingText} />
            <BattleReplayDialog 
                openReplay={openReplay} 
                setOpenReplay={setOpenReplay} 
                battleEvents={battleEvents}
                battleId={battleId}    
            />
            <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', color: 'primary.main' }}>
                <Container fixed justify="center" align="center" maxWidth='xs'>
                    <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', color: 'primary.dark' }} justify="center" align="center">
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h6">{`${dungeons_lib.dungeons[props.dungeonSelected].dungeon_name} Dungeon`}</Typography>
                            </Grid>

                            <Grid item container xs={2} justify="center" align="center">
                                <Button onClick={prevTier} disabled={readyToBattle ? true : false}>{<ArrowBackIosIcon />}</Button>
                            </Grid>
                            <Grid item container xs={8} justifyContent="center" alignItems="center" width={140} height={140}>
                                <Image
                                    src={dungeons_lib.getMonsterImage(props.dungeonSelected, tierIndex)}
                                    alt={dungeons_lib.getMonsterImage(props.dungeonSelected, tierIndex)}
                                    width={tierIndex == 4 ? 140: 48}
                                    height={tierIndex == 4 ? 140: 48}
                                />
                            </Grid>
                            <Grid item container xs={2} justify="center" align="center">
                                <Button onClick={nextTier} disabled={readyToBattle ? true : false}>{<ArrowForwardIosIcon />}</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6">{dungeons_lib.dungeon_tiers[tierIndex].tier_name}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ mb: 1 }}>
                                <Typography variant="body">{`Enemy level: ${dungeons_lib.dungeon_tiers[tierIndex].enemy_level}`}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body">{`Gives:`}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body">{`${dungeons_lib.dungeon_tiers[tierIndex].exp_given} EXP`}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ mb: 2 }}>
                                <Typography variant="body">{`${dungeons_lib.dungeon_tiers[tierIndex].stat_range} ${dungeons_lib.dungeons[props.dungeonSelected].stat_given}`}</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="body">{`Drops:`}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body">{`${dungeons_lib.dungeon_tiers[tierIndex].loot_range} ${dungeons_lib.dungeons[props.dungeonSelected].dungeon_loot} tokens`}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ mb: 2 }}>
                                <Typography variant="body">{`${dungeons_lib.dungeon_tiers[tierIndex].loot_range} SNAP tokens`}</Typography>
                            </Grid>

                            {/* <Grid item xs={12} sx={{ mt: 4 }}>
                                <Typography variant='body'>{`Energy: ${charEnergy} / 1000`}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <LinearProgress variant="determinate" value={charEnergy / 10} sx={{ height: '20px', ml: 5, mr: 5 }} />
                            </Grid> */}

                            <Grid item container xs={12} sx={{ mt: 1 }} align='center' justify='center'>
                                <Grid item xs={12} sx={{ display: readyToBattle ? 'inline' : 'none' }}>
                                    <Typography variant="body" sx={{ ml: 1, mr: 1 }}>
                                        {`Battle found! Lets go and crush the enemy!`}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item container xs={12} sx={{ mt: 1 }} align='center' justify='center'>
                                <Grid item xs={6} sx={{ mt: 1, display: readyToBattle ? 'none':'block'}}>
                                    {backButton}
                                </Grid>
                                <Grid item xs={readyToBattle ? 12 :6} sx={{ mt: 1 }}>
                                    {findBattle}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    );
}