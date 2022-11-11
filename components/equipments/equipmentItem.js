import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Typography, Tooltip, IconButton, Avatar } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import * as apis from "../../random-clash-contracts/api/contracts/contracts-api"
import * as eqpt_details_lib from "../library/equipmentDetailsLib"

export default function EquipmentItem(props) {
    const [eqptName, setEqptName] = React.useState('')
    const [eqptType, setEqptType] = React.useState('')
    const [eqptImg, setEqptImg] = React.useState('')
    const [rarity, setRarity] = React.useState('')
    const [dominantStat, setDominantStat] = React.useState('')
    const [extremity, setExtremity] = React.useState('')

    React.useEffect(() => {
        if(props.equipment_id != 0){
            getEquipment(props.equipment_id)
        }

    }, [props.equipment_id])

    const getEquipment = async (equipment_id) => {
        const eqpt = await apis.core.eqpts.getEquipmentProperties(equipment_id)
        const _type = parseInt(eqpt.equipment_type)
        const _rarity = parseInt(eqpt.rarity)
        const _stat = parseInt(eqpt.dominant_stat)
        const _extremity = parseInt(eqpt.extremity)
        const [_name, _img] = eqpt_details_lib.equipmentNameAndImage(_type, _rarity, _stat, _extremity)
        setEqptName(_name)
        setEqptImg(_img)
        setEqptType(_type)
        setRarity(_rarity)
        setDominantStat(_stat)
        setExtremity(_extremity)
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container>
                <Box sx={{ bgcolor: '#cfe8fc' }}>
                    <Tooltip title={`${props.equipment_id != 0 ? eqptName : `Choose item to equip.`}`}>
                        <IconButton sx={{ p: 0 }}>
                            {props.equipment_id != 0 ? <Avatar alt="Equipment" src={eqptImg} /> : <AddCircleIcon />}
                        </IconButton>
                    </Tooltip>
                    <Typography variant='subtitle2'>{props.label}</Typography>
                </Box>
            </Container>
        </React.Fragment>
    );
}