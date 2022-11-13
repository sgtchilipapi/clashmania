import * as React from 'react';
import { useAccount } from 'wagmi'
import List from '@mui/material/List';

import EquipmentListItem from './equipmentListItem';

export default function EquipmentList(props) {
    const { address } = useAccount()
    return (
        <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {
                !address ? 
                    'Please connect your wallet to view your equipments here.' :
                    props.equipments.length <= 0 ? `You currently dont have any equipments.` :
                        (props.equipments.map((equipment) => {
                            return (
                                <EquipmentListItem
                                    key={equipment.idNum}
                                    equipment={equipment}
                                    setEquipmentSelected={props.setEquipmentSelected}
                                    setEquipmentOpenDialog={props.setEquipmentOpenDialog}
                                />
                            );
                        }))
            }
        </List>
    );
}