import * as React from 'react';
import Image from 'next/image'
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Grid, Typography, LinearProgress, Divider, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import LoadingBackdrop from '../backdrop'

import * as eqpt_details_lib from '../library/equipmentDetailsLib';
import COMM from "../../public/images/equipments/WEAPONS/ATK/COMM.png"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EquipmentDialog(props) {
    const [isLoading, setIsLoading] = React.useState(false)
    const [loadingText, setLoadingText] = React.useState('loading data...')

    const [eqptName, setEqptName] = React.useState('')
    const [eqptType, setEqptType] = React.useState('')
<<<<<<< HEAD
    const [eqptImg, setEqptImg] = React.useState(COMM)
=======
    const [eqptImg, setEqptImg] = React.useState('')
>>>>>>> f66ca43c3484fe530baad863904b1a1f5cff114a
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

    const handleClose = () => {
        props.setEquipmentOpenDialog(false);
    };

    React.useEffect(() => {
        setIsLoading(true)
        setEquipmentDetails(props.equipmentSelected)
    }, [props.equipmentSelected])


    const setEquipmentDetails = async (eqpt) => {
        const [_name, _img] = eqpt_details_lib.equipmentNameAndImage(eqpt.equipment_type, eqpt.rarity, eqpt.dominant_stat, eqpt.extremity)
        const _genTypeName = eqpt_details_lib.getGeneralType(eqpt.equipment_type)
        setEqptName(_name)
        setEqptImg(_img)
        setEqptType(eqpt.equipment_type)
        setRarity(eqpt.rarity)
        setDominantStat(eqpt.dominant_stat)
        setExtremity(eqpt.extremity)
        setTypeName(_genTypeName)

        setAtk(eqpt.atk)
        setDef(eqpt.def)
        setEva(eqpt.hp)
        setHp(eqpt.eva)
        setPen(eqpt.pen)
        setCrit(eqpt.crit)
        setLuk(eqpt.luk)
        setRes(eqpt.res)
        setIsLoading(false)
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
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    {/* <Button onClick={handleClose}>Transfer</Button> */}
                    <Button onClick={handleClose}>Equip</Button>
                </DialogActions>
                </Container>
            </Dialog>




        </React.Fragment>
    );
}