import * as React from 'react';
import {useAccount} from 'wagmi'
import { ListItem, ListItemButton, ListItemText, Avatar, ListItemAvatar } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import * as eqpt_details_lib from "../library/equipmentDetailsLib"
import * as tokens_lib from '../library/tokensLib'
import * as c_apis from "../../random-clash-contracts/api/contracts/contracts-api"

export default function TokenListItem(props) {
    const {address} = useAccount()
    const [tokenBalance, setTokenBalance] = React.useState(0)
    // const [tokenImage, setTokenImage] = React.useState('')

    React.useEffect(() => {
        if(address){
            getTokenBalance()
        }
    }, [, address])

    const getTokenBalance = async () => {
        props.setIsLoading(true)
        let balance = await c_apis.core.tokens.balanceOf(props.token_name, address)
        setTokenBalance(balance)
        props.setIsLoading(false)
    }

    const handleClick = () => {

    }

    return (
            <ListItem onClick={handleClick}
                disablePadding
            >
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar
                            variant='square'
                            src={tokens_lib.getTokenImageByName(props.token_name)}
                        />
                    </ListItemAvatar>
                    <ListItemText id={props.token_name} primary={`${tokenBalance}`} secondary={`${tokens_lib.getTokenTickerByName(props.token_name)}`}/>
                </ListItemButton>
            </ListItem>
    );
}