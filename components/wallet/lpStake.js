import * as React from 'react';
import Image from 'next/image'
import Router from 'next/router';
import Link from 'next/link';
import CssBaseline from '@mui/material/CssBaseline';
import { useAccount } from 'wagmi'

import { Container, Box, Grid, Typography, LinearProgress, Divider, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';

import LoadingBackdrop from '../backdrop'

import * as c_apis from '../../clashmania-contracts/api/contracts/contracts-api'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LpStake(props) {
    const { address } = useAccount()
    const [isLoading, setIsLoading] = React.useState(false)
    const [loadingText, setLoadingText] = React.useState('loading data...')
    const [apr, setApr] = React.useState(0)
    const [lpStake, setLpStake] = React.useState(0)
    const [lpBalance, setLpBalance] = React.useState(0)
    const [rewards, setRewards] = React.useState(0)
    const [approvedLp, setApprovedLp] = React.useState(0)

    React.useEffect(() => {
        if (props.lpStakeOpen) {
            getBalances()
        }
    }, [props.lpStakeOpen])

    const getBalances = async () => {
        getLpBalance()
        getLpStakeAndRewards()
        getApr()
        getApprovedLp()
    }

    const getLpBalance = async () => {
        let balance = await c_apis.core.tokens.balanceOf("clankftm", address)
        setLpBalance(parseInt(balance).toString())
    }

    const getLpStakeAndRewards = async () => {
        const user_info = await c_apis.core.defi.getUserStake("0", address)
        const stake = user_info[0]
        setLpStake(stake)
        const pending_rewards = await c_apis.core.defi.pendingSushi("0", address)
        setRewards(pending_rewards)
    }

    const getApr = async () => {
        const apr = await c_apis.core.defi.getApr(props.token_name)
        setApr(parseInt(apr))
    }

    const getApprovedLp = async () => {
        const approved_lp = await c_apis.core.tokens.allowance("clankftm", address, "minichef")
        setApprovedLp(approved_lp)
    }

    const handleClose = () => {
        props.setLpStakeOpen(false);
    };

    const handleApprove = async () => {
        setIsLoading(true)
        setLoadingText("Waiting for approval tx confimation...")
        await c_apis.core.tokens.approve("clankftm", "minichef", lpBalance)
        setLoadingText("Fetching approved balance...")
        await getApprovedLp()
        setIsLoading(false)
    }

    const handleStake = async () => {
        setIsLoading(true)
        setLoadingText("Waiting for staking tx confimation...")
        await c_apis.core.defi.deposit("0", approvedLp, address)
        setLoadingText("Fetching balances...")
        await getBalances()
        setIsLoading(false)
    }

    const handleHarvest = async () => {
        setIsLoading(true)
        setLoadingText("Waiting for harvest tx confimation...")
        await c_apis.core.defi.harvest("0", address)
        setLoadingText("Fetching balances...")
        await getBalances()
        setIsLoading(false)
    }

    const handleUnstake = async () => {
        setIsLoading(true)
        setLoadingText("Waiting for unstaking tx confimation...")
        await c_apis.core.defi.withdraw("0", lpStake, address)
        setLoadingText("Fetching balances...")
        await getBalances()
        setIsLoading(false)
    }

    const getLpLink = (<a target="_blank" href='https://spooky.fi/#/add/0xA13473ffb118655cdF6F15684Ee6CCE4E4aeaf26/FTM'>
        <Button align='left' sx={{ textDecoration: 'underline' }}>MINT LP</Button>
    </a>)

    return (
        <React.Fragment>
            <CssBaseline />
            <Dialog
                open={props.lpStakeOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle align='center' color={'primary.main'}>{"CLANK-FTM Farm"}</DialogTitle>
                <Container fixed justify="center" align="center" maxWidth='xs'>
                    <DialogContent sx={{ color: 'primary.main' }}>
                        <LoadingBackdrop isLoading={isLoading} loadingText={loadingText} />
                        <Grid container align='center' justify='center'>
                            <Grid item container xs={12}>
                                <Grid item xs={12}>
                                    {`Your LP Balance: ${lpBalance} `}
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>

                                {`Your LP Staked: ${lpStake}`}

                            </Grid>
                            <Grid item xs={12}>

                                {`Rewards Earned: ${rewards} $CLANK!`}

                            </Grid>
                            <Grid item xs={12}>

                                {`Current APR: ${apr}%`}
                            </Grid>

                            <Grid item container xs={12}>
                                <Divider variant='middle' color='black' sx={{ height: '30px' }} />
                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        {getLpLink}
                        <Button
                            onClick={handleApprove}

                            sx={{ display: (parseInt(approvedLp) > 0 || parseInt(lpBalance) <= 0) ? 'none' : 'block' }}>
                            Approve
                        </Button>
                        <Button
                            onClick={handleStake}
                            sx={{ display: (parseInt(approvedLp) > 0) ? 'block' : 'none' }}>
                            Stake
                        </Button>
                        <Button
                            onClick={handleHarvest}
                            sx={{ display: (parseInt(rewards) > 0) ? 'block' : 'none' }}>
                            Harvest
                        </Button>
                        <Button
                            onClick={handleUnstake}
                            sx={{ display: (parseInt(lpStake) > 0) ? 'block' : 'none' }}>
                            Unstake
                        </Button>
                    </DialogActions>
                </Container>
            </Dialog>




        </React.Fragment>
    );
}