import * as React from 'react';
import Image from 'next/image'
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Grid, Typography, LinearProgress, Divider } from '@mui/material';
import * as apis from "../random-clash-contracts/api/contracts/contracts-api"
import * as char_details_lib from '../components/library/characterDetailsLib';

export default function FixedContainer(props) {
    const [charName, setCharName] = React.useState('<Character Name>')
    const [charClass, setCharClass] = React.useState('')
    const [charImage, setCharImage] = React.useState('')
    const [charEnergy, setCharEnergy] = React.useState(0)
    const [charStr, setCharStr] = React.useState(0)
    const [charVit, setCharVit] = React.useState(0)
    const [charDex, setCharDex] = React.useState(0)
    const [charAtk, setCharAtk] = React.useState(0)
    const [charDef, setCharDef] = React.useState(0)
    const [charEva, setCharEva] = React.useState(0)
    const [charHp, setCharHp] = React.useState(0)
    const [charPen, setCharPen] = React.useState(0)
    const [charCrit, setCharCrit] = React.useState(0)
    const [charLuk, setCharLuk] = React.useState(0)
    const [charRes, setCharRes] = React.useState(0)

    React.useEffect(() => {
        getCharacter(props.characterSelected)
    }, [props.characterSelected])

    const getCharacter = async (character_id) => {
        const character = await apis.core.ctrs.getCharacter(props.characterSelected)
        setCharacterDetails(character)
        console.log(character)
    }

    const setCharacterDetails = async (character) => {
        const p = character.char_props
        const s = character.char_stats
        setCharClass(char_details_lib.characterClasses(p.character_class))
        // setCharName(character.character_name)
        setCharEnergy(parseInt(await apis.core.dungeons.getCharacterEnergy(props.characterSelected)))
        setCharImage(char_details_lib.getCharacterImage(p.character_class, p.mood))
        setCharStr(parseInt(p.str))
        setCharVit(parseInt(p.vit))
        setCharDex(parseInt(p.dex))
        setCharAtk(parseInt(s.atk))
        setCharDef(parseInt(s.def))
        setCharHp(parseInt(s.hp))
        setCharEva(parseInt(s.eva))
        setCharPen(parseInt(s.pen))
        setCharCrit(parseInt(s.crit))
        setCharLuk(parseInt(s.luck))
        setCharRes(parseInt(s.energy_restoration))
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed justify="center" align="center" maxWidth='xs'>
                <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', color: 'primary.main' }}>
                    <Grid container align='center' justify='center'>
                        <Grid item xs={12}>
                            <Image
                                src={charImage}
                                alt={charClass}
                                width={140}
                                height={140}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h6'>{charName}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='body'>{charClass}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <LinearProgress variant="determinate" value={charEnergy / 10} sx={{ height: '20px', ml: 5, mr: 5 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='body'>{`Energy: ${charEnergy} / 1000`}</Typography>
                        </Grid>
                        <Grid item container xs={12}>
                            <Grid item xs={4}>
                                <Typography variant='h6'>STR</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='h6'>VIT</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='h6'>DEX</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container xs={12}>
                            <Grid item xs={4}>
                                <Typography variant='body'>{charStr}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='body'>{charVit}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='body'>{charDex}</Typography>
                            </Grid>
                        </Grid>

                        <Grid item container xs={12}>
                            <Divider variant='middle' color='black' sx={{ height: '20px' }} />
                        </Grid>

                        <Grid item container xs={12}>
                            <Grid item xs={3}>
                                <Typography variant='body'>ATK</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='body'>DEF</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='body'>EVA</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='body'>HP</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container xs={12}>
                            <Grid item xs={3}>
                                <Typography variant='body' sx={{textDecoration: 'underline'}}>{charAtk}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='body' sx={{textDecoration: 'underline'}}>{charDef}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='body' sx={{textDecoration: 'underline'}}>{charEva}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='body' sx={{textDecoration: 'underline'}}>{charHp}</Typography>
                            </Grid>
                        </Grid>

                        <Grid item container xs={12}>
                            <Divider variant='middle' color='black' sx={{ height: '10px' }} />
                        </Grid>

                        <Grid item container xs={12}>
                            <Grid item xs={3}>
                                <Typography variant='body'>PEN</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='body'>CRIT</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='body'>LUK</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='body'>RES</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container xs={12}>
                            <Grid item xs={3}>
                                <Typography variant='body' sx={{textDecoration: 'underline'}}>{charPen}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='body' sx={{textDecoration: 'underline'}}>{charCrit}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='body' sx={{textDecoration: 'underline'}}>{charLuk}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='body' sx={{textDecoration: 'underline'}}>{charRes}</Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
}