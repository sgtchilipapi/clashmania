import * as React from 'react';
import {useAccount} from 'wagmi'
import { ListItem, ListItemButton, ListItemText, Avatar, ListItemAvatar } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import * as eqpt_details_lib from "../library/equipmentDetailsLib"
import * as tokens_lib from '../library/tokensLib'
import * as c_apis from "../../clashmania-contracts/api/contracts/contracts-api"

export default function FarmListItem(props) {
    const {address} = useAccount()
    const [tokenBalance, setTokenBalance] = React.useState(0)
    const [apr, setApr] = React.useState(0)
    // const [tokenImage, setTokenImage] = React.useState('')

    React.useEffect(() => {
        if(address){
            getTokenBalance()
        }
        if(props.token_name == "clankftm"){
            getApr()
        }
    }, [, address])

    const getTokenBalance = async () => {
        props.setIsLoading(true)
        let balance = await c_apis.core.tokens.balanceOf(props.token_name, address)
        setTokenBalance(parseInt(balance).toString())
        props.setIsLoading(false)
    }

    const getApr = async () => {
        let apr = await c_apis.core.defi.getApr()
        setApr(parseInt(apr))
    }

    const handleClick = async () => {
       props.setLpStakeOpen(true)
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
                    <ListItemText primary={`${apr}%`} secondary={`APR`}/>
                </ListItemButton>
            </ListItem>
    );
}