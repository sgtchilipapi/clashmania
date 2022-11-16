import * as React from 'react';
import Router from 'next/router'
import {useAccount} from 'wagmi'
import { ListItem, ListItemButton, ListItemText, Avatar, ListItemAvatar, Button} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import * as dungeons_lib from "../library/dungeonsLib"

export default function DungeonItem(props) {
    const {address} = useAccount()
    const dungeon = dungeons_lib.dungeons[props.dungeon_index]

    const handleClick = () => {
        props.setDungeonSelected(dungeon.dungeon_index)
        Router.push('/dungeonDetails')
    }

    return (
        <ListItem
            key={dungeon.dungeon_index}
            secondaryAction={
                <Button onClick={handleClick}><PlayArrowIcon /></Button>
            }
            disablePadding
        >
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar
                        alt={`${dungeon.dungeon_name} Dungeon`}
                        src={dungeon.dungeon_image}
                    />
                </ListItemAvatar>
                <ListItemText id={dungeon.dungeon_index} primary={`${dungeon.dungeon_name} Dungeon`} />
            </ListItemButton>
        </ListItem>
    );
}