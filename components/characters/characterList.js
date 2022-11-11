import * as React from 'react';
import List from '@mui/material/List';

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