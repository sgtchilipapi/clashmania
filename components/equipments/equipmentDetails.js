import * as React from 'react';
import Image from 'next/image'
import Router from 'next/router';
import CssBaseline from '@mui/material/CssBaseline';

import { Container, Box, Grid, Typography, LinearProgress, Divider, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';

import LoadingBackdrop from '../backdrop'

import * as eqpt_details_lib from '../library/equipmentDetailsLib';
import * as c_apis from '../../random-clash-contracts/api/contracts/contracts-api'
import * as s_apis from '../../random-clash-contracts/api/subgraphs/subgraphs-api'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EquipmentDialog(props) {
    const [isLoading, setIsLoading] = React.useState(false)
    const [loadingText, setLoadingText] = React.useState('loading data...')

    const [eqptId, setEqptId] = React.useState(0)
    const [eqptName, setEqptName] = React.useState('')
    const [eqptType, setEqptType] = React.useState('')
    const [eqptImg, setEqptImg] = React.useState('/images/equipments/WEAPONS/ATK/COMM.png')
    const [rarity, setRarity] = React.useState('')
    const [dominantStat, setDominantStat] = React.useState('')
    const [extremity, setExtremity] = React.useState('')
    const [typeName, setTypeName] = React.useState('')
    const [atk, setAtk] = React.useState(0)
    const [def, setDef] = React.useState(0)
    const [eva, setEva] = React.useState(0)
    const [hp, setHp] = React.useState(0)
    const [pen, setPen] = React.useState(0)
    const [crit, setCrit] = React.useState(0)
    const [luk, setLuk] = React.useState(0)
    const [res, setRes] = React.useState(0)

    const [equippedToId, setEquippedToId] = React.useState(0)
    const [equippedToName, setEquippedToName] = React.useState('')

    const handleClose = () => {
        props.setEquipmentOpenDialog(false);
    };

    React.useEffect(() => {
        if(props.equipmentSelected){
            setIsLoading(true)
            setEquipmentDetails(props.equipmentSelected)
        }
    }, [props.equipmentSelected])


    const setEquipmentDetails = async (eqpt) => {
        const [_name, _img] = eqpt_details_lib.equipmentNameAndImage(eqpt.equipment_type, eqpt.rarity, eqpt.dominant_stat, eqpt.extremity)
        const _genTypeName = eqpt_details_lib.getGeneralType(eqpt.equipment_type)
        setEqptId(eqpt.idNum)
        setEqptName(_name)
        setEqptImg(_img)
        setEqptType(eqpt.equipment_type)
        setRarity(eqpt.rarity)
        setDominantStat(eqpt.dominant_stat)
        setExtremity(eqpt.extremity)
        setTypeName(_genTypeName)

        setAtk(eqpt.atk)
        setDef(eqpt.def)
        setEva(eqpt.eva)
        setHp(eqpt.hp)
        setPen(eqpt.pen)
        setCrit(eqpt.crit)
        setLuk(eqpt.luk)
        setRes(eqpt.res)

        await getEquipStatus(eqpt.idNum)
    }

    const getEquipStatus = async (id) => {
        setIsLoading(true)
        setLoadingText(`Loading equipment information...`)
        if (id > 0) {
            const equippedTo = parseInt(await c_apis.periphery.equipments.eqpt_mngr.getItemEquippedToWho(id))
            if (equippedTo) {
                setEquippedToId(equippedTo)
                const character = await s_apis.core.ctrs.getCharacter(equippedTo)
                setEquippedToName(character.character_name)
            }
            if (equippedTo == 0) {
                setEquippedToId(0)
                setEquippedToName('')
            }
        }
        setIsLoading(false)
    }

    const handleUnequip = async () => {
        try{
            setIsLoading(true)
            setLoadingText('(1/1) Waiting for the UNEQUIP transaction to be confirmed on the blockchain.')
            await c_apis.periphery.equipments.eqpt_mngr.unequipItem(eqptId)
            await getEquipStatus(eqptId)
            setIsLoading(false)
            props.setEquipmentOpenDialog(false)
            props.setEquipmentsUpdated(prevState => prevState + 1)
        }catch {
            alert('Failed to unequip the item! Make sure you to confirm the transaction.')
            setIsLoading(false)
        }

    }
    const handleEquip = async () => {
        if (props.characterSelected == 0 || props.characterSelected == null || props.characterSelected == undefined || props.characterSelected == '') {
            const characterStored = parseInt(localStorage.getItem('characterSelected'))
            if (characterStored != undefined) {
                props.setCharacterSelected(characterStored)
                sendEquipTx(characterStored, eqptId)
            }
            if (characterStored == undefined) {
                alert('Please select a character first.')
                Router.push('characters')
            }
        }
        if(props.characterSelected > 0){
            sendEquipTx(props.characterSelected, eqptId)

        }
    }
    const sendEquipTx = async (character, equipment) => {
        if (character == equippedToId) {
            alert(`Already equipped to the character selected: ${equippedToName}`)
        }
        else {
            try{
                setIsLoading(true)
                setLoadingText('(1/1) Waiting for the EQUIP transaction to be confirmed on the blockchain.')
                await c_apis.periphery.equipments.eqpt_mngr.equip(character, equipment)
                setIsLoading(false)
                getEquipStatus(eqptId)
                props.setEquipmentOpenDialog(false)
                Router.push('/characterDetails')
            }catch{
                alert('Failed to equip the item! Make sure you have a character selected in the characters page.')
                setIsLoading(false)
            }

        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Dialog
                open={props.equipmentOpenDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                {/* <DialogTitle>{"YOUR EQUIPMENT"}</DialogTitle> */}
                <Container fixed justify="center" align="center" maxWidth='xs'>
                    <DialogContent sx={{ color: 'primary.main' }}>
                        <LoadingBackdrop isLoading={isLoading} loadingText={loadingText} />
                        <Grid container align='center' justify='center'>
                            <Grid item xs={12}>
                                <Image
                                    src={eqptImg}
                                    alt={eqptName}
                                    width={90}
                                    height={90}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h6'>{eqptName}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ mb: 2 }}>
                                <Typography variant='body'>{typeName}</Typography>
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
                                    <Typography variant='body' >{atk}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant='body' >{def}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant='body' >{`${eva / 10} %`}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant='body' >{hp}</Typography>
                                </Grid>
                            </Grid>

                            <Grid item container xs={12}>
                                <Divider variant='middle' color='black' sx={{ height: '30px' }} />
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
                                    <Typography variant='body' >{`${pen / 10} %`}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant='body' >{`${crit / 10} %`}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant='body' >{`${luk / 10} %`}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant='body' >{`${res / 10} %`}</Typography>
                                </Grid>
                            </Grid>

                            <Grid item container xs={12}>
                                <Divider variant='middle' color='black' sx={{ height: '30px' }} />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant='body2' >{equippedToId == 0 ? `Not equipped to any one.` : `Equipped to: ${equippedToName}`}</Typography>
                            </Grid>

                            <Grid item container xs={12}>
                                <Divider variant='middle' color='black' sx={{ height: '30px' }} />
                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        <Button onClick={handleUnequip} disabled={equippedToId > 0 ? false : true}>Unequip</Button>
                        <Button onClick={handleEquip} disabled={equippedToId != 0 && equippedToId == props.characterSelected ? true : false}>Equip</Button>
                    </DialogActions>
                </Container>
            </Dialog>




        </React.Fragment>
    );
}