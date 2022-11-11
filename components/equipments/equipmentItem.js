import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {Typography} from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

import * as apis from "../../random-clash-contracts/api/contracts/contracts-api"
import * as eqpt_details_lib from "../library/equipmentDetailsLib"

export default function EquipmentItem(props) {
    const [eqptName, setEqptName] = React.useState('')
    const [eqptType, setEqptType] = React.useState('')
    const [eqptImg, setEqptImg] = React.useState('')
    const [rarity, setRarity] = React.useState('')
    const [dominantStat, setDominantStat] = React.useState('')
    const [extremity, setExtremity] = React.useState('')

    React.useEffect(()=>{
        getEquipment(props.equipment_id)
    },[props.equipment_id])

    const getEquipment = async(equipment_id) => {
        const eqpt = await apis.core.eqpts.getEquipmentProperties(equipment_id)
        const _type = parseInt(eqpt.equipment_type)
        const _rarity = parseInt(eqpt.rarity)
        const _stat = parseInt(eqpt.dominant_stat)
        console.log(eqpt_details_lib.getEquipmentImage(_type, _rarity, _stat))
        // setEqptType()
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container>
                <Box sx={{ bgcolor: '#cfe8fc' }}>
                    <BusinessCenterIcon />
                </Box>
            </Container>
        </React.Fragment>
    );
}