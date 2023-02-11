import * as React from 'react';
import { useAccount } from 'wagmi'
import List from '@mui/material/List';

import FarmListItem from './farmListItem';
import { Typography } from '@mui/material';

export default function FarmList(props) {
    const { address } = useAccount()
    const pairs = ['clankftm']
    return (
        <>
            <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Typography variant='body1'>{address ? 'Farm':''}</Typography>
                {
                    !address ?
                    <Typography variant='body1' sx={{m:1}}></Typography> :
                        
                        (pairs.map((token, index) => {
                            return (
                                <FarmListItem
                                    key={index}
                                    token_name={token}
                                    setIsLoading={props.setIsLoading}
                                    setLpStakeOpen={props.setLpStakeOpen}
                                />
                            );
                        }))
                }
            </List>

            {/* <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
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
            </List> */}
        </>
    );
}