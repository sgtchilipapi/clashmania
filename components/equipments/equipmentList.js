import * as React from 'react';
import List from '@mui/material/List';

import EquipmentListItem from './equipmentListItem';

export default function EquipmentList(props) {
    return (
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
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