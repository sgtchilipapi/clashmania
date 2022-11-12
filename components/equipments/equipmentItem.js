import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Typography, Tooltip, IconButton, Avatar } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import * as c_apis from "../../random-clash-contracts/api/contracts/contracts-api"
import * as s_apis from "../../random-clash-contracts/api/subgraphs/subgraphs-api"
import * as eqpt_details_lib from "../library/equipmentDetailsLib"
import Router from 'next/router';

export default function EquipmentItem(props) {
    const [eqptItem, setEqptItem] = React.useState({})
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

    const handleOpenItem = () => {
        if(props.equipment_id > 0){
            props.setEquipmentSelected(eqptItem)
            props.setEquipmentOpenDialog(true)
        }
        if(props.equipment_id == 0){
            Router.push('/equipments')
        }
        
    }

    const getEquipment = async (equipment_id) => {
        const eqpt = await s_apis.core.eqpts.getEquipment(equipment_id)
        const [_name, _img] = eqpt_details_lib.equipmentNameAndImage(eqpt.equipment_type, eqpt.rarity, eqpt.dominant_stat, eqpt.extremity)
        setEqptName(_name)
        setEqptImg(_img)
        // setEqptType(eqpt.equipment_type)
        // setRarity(eqpt.rarity)
        // setDominantStat(eqpt.dominant_stat)
        // setExtremity(eqpt.extremity)
        setEqptItem(eqpt)
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container>
                <Box sx={{ bgcolor: '#cfe8fc' }}>
                    <Tooltip title={`${props.equipment_id != 0 ? eqptName : `Choose item to equip.`}`}>
                        <IconButton onClick={handleOpenItem} sx={{ p: 0 }}>
                            {props.equipment_id != 0 ? <Avatar alt="Equipment" variant='square' src={eqptImg} /> : <AddCircleIcon />}
                        </IconButton>
                    </Tooltip>
                    <Typography variant='subtitle2'>{props.label}</Typography>
                </Box>
            </Container>
        </React.Fragment>
    );
}