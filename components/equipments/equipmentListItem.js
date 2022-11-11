import * as React from 'react';
import { ListItem, ListItemButton, ListItemText, Avatar, ListItemAvatar } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import * as eqpt_details_lib from "../library/equipmentDetailsLib"

export default function EquipmentListItem(props) {
    const [eqptId, setEqptId] = React.useState(0)
    const [eqptName, setEqptName] = React.useState('')
    const [eqptType, setEqptType] = React.useState('')
    const [eqptImg, setEqptImg] = React.useState('')
    const [rarity, setRarity] = React.useState('')
    const [dominantStat, setDominantStat] = React.useState('')
    const [extremity, setExtremity] = React.useState('')
    const [typeName, setTypeName] = React.useState('')

    React.useEffect(() => {
        if (props.equipment.idNum != 0) {
            getEquipment(props.equipment)
        }
    }, [])

    const getEquipment = async (eqpt) => {
        setEqptId(eqpt.idNum)
        const _type = parseInt(eqpt.equipment_type)
        const _rarity = parseInt(eqpt.rarity)
        const _stat = parseInt(eqpt.dominant_stat)
        const _extremity = parseInt(eqpt.extremity)
        const [_name, _img] = eqpt_details_lib.equipmentNameAndImage(_type, _rarity, _stat, _extremity)
        const _genTypeName = eqpt_details_lib.getGeneralType(_type)
        setEqptName(_name)
        setEqptImg(_img)
        setEqptType(_type)
        setRarity(_rarity)
        setDominantStat(_stat)
        setExtremity(_extremity)
        setTypeName(_genTypeName)
    }

    const handleClick = () => {
        props.setEquipmentSelected(props.equipment)
        props.setEquipmentOpenDialog(true)
    }

    return (
            <ListItem onClick={handleClick}
                
                // secondaryAction={
                //     <Button onClick={handleClick}><PlayArrowIcon /></Button>
                // }
                disablePadding
            >
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar
                            alt={eqptName}
                            src={eqptImg}
                        />
                    </ListItemAvatar>
                    <ListItemText id={eqptId} primary={`${typeName} - ${eqptName}`} />
                </ListItemButton>
            </ListItem>
    );
}