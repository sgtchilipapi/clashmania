import * as React from 'react';
import { useAccount } from 'wagmi'
import List from '@mui/material/List';

import CharacterItem from './characterItem';

export default function CharacterList(props) {
    const {address} = useAccount()
    return (
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
                !address ? 
                'Please connect your wallet to view your characters here.' :
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