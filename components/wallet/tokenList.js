import * as React from 'react';
import { useAccount } from 'wagmi'
import List from '@mui/material/List';

import TokenListItem from './tokenListItem';
import { Typography } from '@mui/material';

export default function TokenList(props) {
    const { address } = useAccount()
    const materials = ['clank', 'boom', 'thump', 'clink', 'snap']
    const catalysts = ['yellowspark', 'whitespark', 'redspark', 'bluespark']
    const consumables = ['enerlink']
    const pool_tokens = ['clankmatic', 'clankboom', 'clankthump', 'clankclink', 'clanksnap']
    return (
        <>
            <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Typography variant='body1'>{address ? 'Material Tokens':''}</Typography>
                {
                    !address ?
                    <Typography variant='body1' sx={{m:1}}>Please connect your wallet to view your Random Clash tokens here.</Typography> :
                        
                        (materials.map((token, index) => {
                            return (
                                <TokenListItem
                                    key={index}
                                    token_name={token}
                                    setIsLoading={props.setIsLoading}
                                />
                            );
                        }))
                }
            </List>

            <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Typography variant='body1'>{address ? 'Catalyst Tokens':''}</Typography>
                {
                    !address ?
                        '' :
                        (catalysts.map((token, index) => {
                            return (
                                <TokenListItem
                                    key={index}
                                    token_name={token}
                                    setIsLoading={props.setIsLoading}
                                />
                            );
                        }))
                }
            </List>

            <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Typography variant='body1'>{address ? 'Consumable Tokens': ''}</Typography>
                {
                    !address ?
                        '' :
                        (consumables.map((token, index) => {
                            return (
                                <TokenListItem
                                    key={index}
                                    token_name={token}
                                    setIsLoading={props.setIsLoading}
                                />
                            );
                        }))
                }
            </List>

            <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Typography variant='body1'>{address ? 'Liquidity-Pool Tokens': ''}</Typography>
                {
                    !address ?
                        '' :
                        (pool_tokens.map((token, index) => {
                            return (
                                <TokenListItem
                                    key={index}
                                    token_name={token}
                                    setIsLoading={props.setIsLoading}
                                />
                            );
                        }))
                }
            </List>
        </>
    );
}