import * as React from 'react';
import Router from 'next/router'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import { Button, Typography, TextField } from '@mui/material';
import Image from 'next/image'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LoadingBackdrop from '../components/backdrop';
import * as char_mint_lib from "../components/library/characterMintingLib"
import * as c_apis from "../random-clash-contracts/api/contracts/contracts-api"

export default function FixedContainer(props) {
    const [charIndex, setCharIndex] = React.useState(0)
    const [charName, setCharName] = React.useState('')
    const [requestExists, setRequestExists] = React.useState(false)
    const [readyToMint, setReadyToMint] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [loadingText, setLoadingText] = React.useState('Loading...')

    React.useEffect(() => {
        getRequest()
    }, [])

    const prevChar = () => setCharIndex(charIndex > 0 ? charIndex => charIndex - 1 : 0)
    const nextChar = () => setCharIndex(charIndex < 5 ? charIndex => charIndex + 1 : 5)
    const handleChange = (e) => setCharName(e.target.value.replace(/[^\w\s]/gi, ""))

    const getRequest = async () => {
        setLoadingText('Loading previous character mint request...')
        setIsLoading(true)
        const request = await c_apis.periphery.routers.ctr_minter.getRequest(localStorage.getItem('wallet'))
        if (parseInt(request.request_id) > 0) {
            setRequestExists(true)
            setCharName(request._name)
            getFulfillment(request.request_id)
        } else {
            setIsLoading(false)
        }
    }

    const getFulfillment = async (request_id) => {
        const request = await c_apis.periphery.chainlink.ctrs_vrf.getRequestStatus(request_id)
        if (request.fulfilled) {
            setReadyToMint(true)
            setIsLoading(false)
        } else {
            setIsLoading(true)
            listenToVRF()
        }
    }

    const sendRequest = async () => {
        try {
            setLoadingText('Waiting for character creation request confirmation...')
            setIsLoading(true)
            await c_apis.periphery.routers.ctr_minter.requestCharacter(charIndex, charName, "0")
            setRequestExists(true)
            listenToVRF()
        }
        catch {
            setIsLoading(false)
            alert('Failed to submit character creation request! You might have already submitted a request that should be minted first.')
        }
    }

    const mint = async () => {
        try {
            setLoadingText('Waiting for mint transaction confirmation...')
            setIsLoading(true)
            const mint_receipt = await c_apis.periphery.routers.ctr_minter.mintCharacter()
            props.setCharacterSelected(parseInt(mint_receipt.logs[0].topics[3]))
            setRequestExists(false)
            setReadyToMint(false)
            setCharIndex(0)
            setCharName('')
            setIsLoading(false)
            props.setCharacterIcon(localStorage.setItem('characterIcon', char_mint_lib.characterImages(charIndex)))
            Router.push('/characterDetails')
        }
        catch {
            setIsLoading(false)
            alert('Failed to mint character! You might not have any request to mint! Please submit a request first.')
        }
    }

    const listenToVRF = async () => {
        setLoadingText('Waiting for VRF fulfillment...')
        const contract = await c_apis.periphery.chainlink.ctrs_vrf.getListener()
        contract.on("RequestFulfilled", (request_id, numWords, user, experimental) => {
            console.log(contract.listeners("RequestFulfilled"))
            if (user == localStorage.getItem('wallet')) {
                setReadyToMint(true)
                console.log('Request has been fulfilled by the VRF! The character NFT is ready to be minted!')
                contract.removeAllListeners("RequestFulfilled");
                console.log(contract.listeners("RequestFulfilled"))
                setIsLoading(false)
            }
        })
    }

    ///This function listens to any mint events emitted from the Characters NFT contract for experimental request only.
    const listenToMints = async () => {
        const contract = await c_apis.core.ctrs.getListener()
        contract.on("CharacterMinted", (a, address, c, d) => {
            if (address == localStorage.getItem('wallet')) {
                setRequestExists(false)
                contract.off("CharacterMinted")
            }
        })
        console.log('listening to mints...')
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <LoadingBackdrop isLoading={isLoading} loadingText={loadingText} />
            <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', color: 'primary.main' }}>
                <Container fixed justify="center" align="center" maxWidth='xs'>
                    <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', color: 'primary.dark' }} justify="center" align="center">
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h6">Create Character</Typography>
                            </Grid>

                            <Grid item container xs={2} justify="center" align="center">
                                <Button onClick={prevChar} disabled={readyToMint ? true : false}>{<ArrowBackIosIcon />}</Button>
                            </Grid>
                            <Grid item xs={8} align="center">
                                <Image
                                    src={char_mint_lib.characterImages(charIndex)}
                                    alt={char_mint_lib.characterNames(charIndex)}
                                    width={140}
                                    height={140}
                                />
                            </Grid>
                            <Grid item container xs={2} justify="center" align="center">
                                <Button onClick={nextChar} disabled={readyToMint ? true : false}>{<ArrowForwardIosIcon />}</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6">{char_mint_lib.characterNames(charIndex)}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ mb: 1 }}>
                                <Typography variant="body" sx={{ display: readyToMint ? 'none' : 'inline', ml: 1, mr: 1 }}>{char_mint_lib.characterDesc(charIndex)}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ mb: 1 }}>
                                <Typography variant="body" sx={{ display: readyToMint ? 'none' : 'inline', ml: 1, mr: 1 }}>{char_mint_lib.characterBonus(charIndex)}</Typography>
                            </Grid>
                            <Grid item container xs={12} sx={{ mt: 1 }} align='center' justify='center'>
                                <Grid item xs={12}>
                                    <Typography variant="body" sx={{ display: readyToMint ? 'inline' : 'none', ml: 1, mr: 1 }}>
                                        {`Congratulations! ${charName} is ready to be minted! Please click mint below.`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        disabled={requestExists}
                                        required
                                        id="outlined-required"
                                        label="Enter name"
                                        value={charName}
                                        onChange={handleChange}
                                        sx={{ visibility: readyToMint ? 'hidden' : 'visible' }}
                                    />
                                </Grid>

                            </Grid>

                            <Grid item xs={12} sx={{ mt: 1 }}>
                                {
                                    readyToMint ? <Button onClick={mint} variant="outlined">Mint</Button> :
                                        <Button onClick={sendRequest} variant="outlined" disabled={requestExists}>Create</Button>
                                }
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    );
}