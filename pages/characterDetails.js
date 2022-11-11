import * as React from 'react';
import Image from 'next/image'
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Grid, Typography, LinearProgress, Divider, Button } from '@mui/material';

import EquipmentItem from '../components/equipments/equipmentItem';
import LoadingBackdrop from '../components/backdrop'

import * as apis from "../random-clash-contracts/api/contracts/contracts-api"
import * as char_details_lib from '../components/library/characterDetailsLib';

export default function FixedContainer(props) {
    const [isLoading, setIsLoading] = React.useState(false)
    const [loadingText, setLoadingText] = React.useState('loading data...')

    const [charName, setCharName] = React.useState('')
    const [charClass, setCharClass] = React.useState('')
    const [charImage, setCharImage] = React.useState('/images/characters/0 Viking/Angry.png')
    const [charEnergy, setCharEnergy] = React.useState(0)
    const [charLevel, setCharLevel] = React.useState(1)
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

    const [weapon, setWeapon] = React.useState(0)
    const [armor, setArmor] = React.useState(0)
    const [headgear, setHeadgear] = React.useState(0)
    const [accessory, setAccessory] = React.useState(0)

    React.useEffect(() => {
        setCharImage(localStorage.getItem('characterIcon'))
        getCharacter(props.characterSelected)
        getCharacterEquipments(props.characterSelected)
        getCharacterEnergy(props.characterSelected)
    }, [props.characterSelected])

    const getCharacter = async (character_id) => {
        setIsLoading(true)
        setLoadingText('Loading character details...')
        const character = await apis.core.ctrs.getCharacter(character_id)

        setCharacterDetails(character)
    }

    const setCharacterDetails = async (character) => {
        const p = character.char_props
        const s = character.char_stats

        setCharImage(char_details_lib.getCharacterImage(p.character_class, p.mood))
        setCharClass(char_details_lib.characterClasses(p.character_class))
        setCharName(character.char_name)
        setCharLevel((p.exp / 100) + 1)
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
        props.setCharacterIcon(char_details_lib.getCharacterImage(p.character_class, p.mood))

        setIsLoading(false)
    }

    const getCharacterEquipments = async (character_id) => {
        setLoadingText('Loading character details...')
        const equipments = await apis.periphery.equipments.eqpt_mngr.getCharacterEquipments(character_id)
        console.log(equipments)
        setWeapon(parseInt(equipments.weapon))
        setArmor(parseInt(equipments.armor))
        setHeadgear(parseInt(equipments.headgear))
        setAccessory(parseInt(equipments.accessory))
    }

    const getCharacterEnergy = async(character_id) => {
        setLoadingText('Loading character details...')
        setCharEnergy(parseInt(await apis.core.dungeons.getCharacterEnergy(character_id)))
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', color: 'primary.main' }}>
                <Container fixed justify="center" align="center" maxWidth='xs'>
                    <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', color: 'primary.main' }}>
                        <LoadingBackdrop isLoading={isLoading} loadingText={loadingText} />
                        <Typography variant='h6'>YOUR CHARACTER</Typography>
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
                            <Grid item xs={12} sx={{ mb: 2 }}>
                                <Typography variant='body'>{`Lvl ${charLevel} ${charClass}`}</Typography>
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

                            {/* <Grid item container xs={12}>
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
                                <Typography variant='body' sx={{ textDecoration: 'underline' }}>{charAtk}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='body' sx={{ textDecoration: 'underline' }}>{charDef}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='body' sx={{ textDecoration: 'underline' }}>{`${charEva / 10} %`}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='body' sx={{ textDecoration: 'underline' }}>{charHp}</Typography>
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
                                <Typography variant='body' sx={{ textDecoration: 'underline' }}>{`${charPen / 10} %`}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='body' sx={{ textDecoration: 'underline' }}>{`${charCrit / 10} %`}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='body' sx={{ textDecoration: 'underline' }}>{`${charLuk / 10} %`}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='body' sx={{ textDecoration: 'underline' }}>{`${charRes / 10} %`}</Typography>
                            </Grid>
                        </Grid> */}

                            <Grid item container xs={12}>
                                <Divider variant='middle' color='black' sx={{ height: '30px' }} />
                            </Grid>

                            {/* <Box sx={{bgcolor: 'primary.main'}}> */}
                            <Grid item container xs={12} align='center' justify='center'>
                                <Grid item xs={12} sx={{ mb: 2 }}>
                                    <Typography variant='body'>EQUIPMENTS</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <EquipmentItem
                                        equipment_id={weapon}
                                        label='WPN'
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <EquipmentItem
                                        equipment_id={armor}
                                        label='AMR'
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <EquipmentItem
                                        equipment_id={headgear}
                                        label='HGR'
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <EquipmentItem
                                        equipment_id={accessory}
                                        label='ACC'
                                    />
                                </Grid>
                            </Grid>
                            {/* </Box> */}

                            <Grid item xs={12} sx={{ mt: 4 }}>
                                <Typography variant='body'>{`Energy: ${charEnergy} / 1000`}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <LinearProgress variant="determinate" value={charEnergy / 10} sx={{ height: '20px', ml: 5, mr: 5 }} />
                            </Grid>

                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <Button variant='outlined'>Enter Dungeons</Button>
                            </Grid>

                        </Grid>
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    );
}