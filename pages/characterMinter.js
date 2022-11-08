import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import { Button, Typography, TextField } from '@mui/material';
import Image from 'next/image'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import * as char_mint_lib from "../components/library/characterMintingLib"
import * as c_apis from "../random-clash-contracts/api/contracts/contracts-api"
import {ethers} from 'ethers'

export default function FixedContainer() {
    const [charIndex, setCharIndex] = React.useState(0)
    const [charName, setCharName] = React.useState('')
    const [requestExists, setRequestExists] = React.useState(false)

    React.useEffect(()=>{
        getRequest()
    }, [])

    const prevChar = () => setCharIndex(charIndex > 0 ? charIndex => charIndex - 1 : 0)
    const nextChar = () => setCharIndex(charIndex < 5 ? charIndex => charIndex + 1 : 5)
    const handleChange = (e) => setCharName(e.target.value.replace(/[^\w\s]/gi, ""))

    const getRequest = async () => {
        const request = await c_apis.periphery.routers.ctr_minter.getRequest(localStorage.getItem('wallet'))
        if(parseInt(request.request_id) > 0){setRequestExists(true)}
    }
    const sendRequest = async () => {
        try{
            await c_apis.periphery.routers.ctr_minter.requestCharacter(charIndex, charName, "0")
            setRequestExists(true)
        }
        catch{
            alert('Failed to submit character creation request! You might have already submitted a request that should be minted first.')
        }
    }

    const mint = async () => {
        try{
            await c_apis.periphery.routers.ctr_minter.mintCharacter()
            setRequestExists(false)
            setCharIndex(0)
            setCharName('')
            const contract = c_apis.core.ctrs.getContract()
            contract.on("CharacterMinted", (a,b,c,d) => {
                console.log(b)
            })
        }
        catch{
            alert('Failed to mint character! You might not have any request to mint! Please submit a request first.')
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed justify="center" align="center" maxWidth='xs'>
                <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', color: 'primary.dark' }} justify="center" align="center">
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h6">Create Character</Typography>
                        </Grid>
                        <Grid item container xs={2} justify="center" align="center">
                            <Button onClick={prevChar}>{<ArrowBackIosIcon />}</Button>
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
                            <Button onClick={nextChar}>{<ArrowForwardIosIcon />}</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">{char_mint_lib.characterNames(charIndex)}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body">{char_mint_lib.characterDesc(charIndex)}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body">{char_mint_lib.characterBonus(charIndex)}</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{mt:1}}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Enter name"
                                value={charName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{mt:1}}>
                            {
                                requestExists ? <Button onClick={mint} variant="outlined">Mint</Button> : <Button onClick={sendRequest} variant="outlined">Create</Button>
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
}