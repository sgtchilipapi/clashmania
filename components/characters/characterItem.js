import * as React from 'react';
import Router from 'next/router'
import {useAccount} from 'wagmi'
import { ListItem, ListItemButton, ListItemText, Avatar, ListItemAvatar, Button} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import * as char_details_lib from "../library/characterDetailsLib"

export default function CharacterItem(props) {
    const {address} = useAccount()
    const char_img = char_details_lib.getCharacterImage(props.data.character_class, props.data.character_mood)

    const handleClick = () => {
        props.setCharacterSelected(props.data.character_idnum)
        props.setCharacterIcon(char_img)
        localStorage.setItem(`characterSelected-${address}`, props.data.character_idnum)
        localStorage.setItem(`characterIcon-${address}`, char_img)
        Router.push('/characterDetails')
    }

    return (
        <ListItem
            key={props.data.character_idnum}
            secondaryAction={
                <Button onClick={handleClick}><PlayArrowIcon /></Button>
            }
            disablePadding
        >
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar onClick={handleClick}
                        alt={props.data.character_name}
                        src={char_img}
                    />
                </ListItemAvatar>
                <ListItemText id={props.data.character_idnum} primary={`lvl ${props.data.character_exp / 100 + 1} - ${props.data.character_name}`} />
            </ListItemButton>
        </ListItem>
    );
}