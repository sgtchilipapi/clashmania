import * as React from 'react';
import { useAccount } from 'wagmi'

import List from '@mui/material/List';

import CharacterItem from './dungeonItem';
import DungeonItem from './dungeonItem';

export default function DungeonList(props) {
    const {address} = useAccount()
    return (
        <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {
                !address ? 
                'Please connect your wallet to view the dungeons here.' :
                    (props.dungeons.map((dungeon) => {
                        return (
                            <DungeonItem
                                key={dungeon}
                                dungeon_index={dungeon}
                                setDungeonSelected={props.setDungeonSelected}
                            />
                        );
                    }))
            }
        </List>
    );
}