import * as React from 'react';
import Router from 'next/router'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import * as apis from "../../random-clash-contracts/api/contracts/contracts-api"
import * as char_details_lib from "../library/characterDetailsLib"
import CharacterItem from './characterItem';

export default function CharacterList(props) {
    return (
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
                props.characters.length <= 0 ? `You currently dont have any characters.` :
                    (props.characters.map((character) => {
                        return (
                            <CharacterItem
                                key={character.character_idnum}
                                data={character}
                                setCharacterSelected={props.setCharacterSelected}
                                setCharacterIcon={props.setCharacterIcon}
                            />
                        );
                    }))
            }
        </List>
    );
}