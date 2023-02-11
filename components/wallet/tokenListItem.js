import * as React from 'react';
import { useAccount } from 'wagmi'
import { ListItem, ListItemButton, ListItemText, Avatar, ListItemAvatar, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import * as eqpt_details_lib from "../library/equipmentDetailsLib"
import * as tokens_lib from '../library/tokensLib'
import * as c_apis from "../../clashmania-contracts/api/contracts/contracts-api"

export default function TokenListItem(props) {
    const { address } = useAccount()
    const [tokenBalance, setTokenBalance] = React.useState(0)
    const [underlyingLpBalance, setUnderlyingLpBalance] = React.useState(0)
    // const [tokenImage, setTokenImage] = React.useState('')

    React.useEffect(() => {
        if (address) {
            getTokenBalance()
        }
    }, [, address])

    const getTokenBalance = async () => {
        props.setIsLoading(true)
        let balance = await c_apis.core.tokens.balanceOf(props.token_name, address)
        setTokenBalance(balance)
        props.setIsLoading(false)
        getLpBalance()
    }

    const getLpBalance = async () => {
        if (props.token_name == "yellowspark" || props.token_name == "whitespark" || props.token_name == "redspark" || props.token_name == "bluespark") {
            props.setIsLoading(true)
            let balance = await c_apis.core.tokens.balanceOf(tokens_lib.getUnderlyingLP(props.token_name), address)
            setUnderlyingLpBalance(balance)
            props.setIsLoading(false)
        }

    }

    const handleClick = () => {

    }

    const handleMintCatalyst = async () => {
        props.setIsLoading(true)
        const amount = parseInt(underlyingLpBalance) % 10;
        console.log(`Amont ${amount}`)
        await c_apis.core.tokens.mint(props.token_name, address, amount)
        props.setIsLoading(false)
    }

    const actionButton = (
        (props.token_name == "yellowspark" || props.token_name == "whitespark" || props.token_name == "redspark" || props.token_name == "bluespark") ?
            parseInt(underlyingLpBalance) >= 10 ?
                <Button onClick={handleMintCatalyst}>{`Mint ${tokens_lib.getTokenTickerByName(props.token_name)}`}</Button> :
                <a target="_blank" href={tokens_lib.getSpookyAddress(props.token_name)}><Button>{`Get ${tokens_lib.getTokenTickerByName(tokens_lib.getUnderlyingLP(props.token_name))} LP`}</Button></a> :
            ""
    )

    return (
        <ListItem
            disablePadding
        >
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar
                        variant='square'
                        src={tokens_lib.getTokenImageByName(props.token_name)}
                    />
                </ListItemAvatar>
                <ListItemText id={props.token_name} primary={`${tokenBalance}`} secondary={`${tokens_lib.getTokenTickerByName(props.token_name)}`} />
                
                {actionButton}
            </ListItemButton>
        </ListItem>
    );
}