import * as React from 'react';
import Image from 'next/image'
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Grid, Typography, LinearProgress, Divider, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';

import LoadingBackdrop from '../backdrop'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function BattleReplayDialog(props) {
    const [isLoading, setIsLoading] = React.useState(false)
    const [loadingText, setLoadingText] = React.useState('loading data...')
    const [isPlaying, setIsPlaying] = React.useState(false)

    //game states
    const [charHp, setCharHp] = React.useState(0)
    const [charDef, setCharDef] = React.useState(0)
    const [charMaxHp, setCharMaxHp] = React.useState(0)
    const [charMaxDef, setCharMaxDef] = React.useState(0)
    const [enemHp, setEnemHp] = React.useState(0)
    const [enemDef, setEnemDef] = React.useState(0)
    const [enemMaxHp, setEnemMaxHp] = React.useState(0)
    const [enemMaxDef, setEnemMaxDef] = React.useState(0)

    const [result, setResult] = React.useState(0)
    const [expGained, setExpGained] = React.useState(0)
    const [statGained, setStatGained] = React.useState(0)
    const [lootGained, setLootGained] = React.useState(0)
    const [snapGained, setSnapGained] = React.useState(0)

    let duelInterval

    const handleClose = () => {
        props.setReplayOpen(false);
    };

    const handleSkip = () => {
        setResult(0)
        setIsPlaying(false)
        if (props.battleId) {
            const be = props.battleEvents
            const i = be.clashes.length - 1
            setCharHp(be.clashes[i].balances.char_hp)
            setCharDef(be.clashes[i].balances.char_def)
            setEnemHp(be.clashes[i].balances.enem_hp)
            setEnemDef(be.clashes[i].balances.enem_def)
            showResults(be.clashes[i].balances)
        }
    }

    const handlePlay = () => {
        setResult(0)
        console.log('playing')
        setIsPlaying(true)
    }

    React.useEffect(() => {
        if (isPlaying && props.battleId) {
            const be = props.battleEvents
            setBalancesToFull(be)
            let i = 0;
            duelInterval = setInterval(() => {
                setCharHp(be.clashes[i].balances.char_hp)
                setCharDef(be.clashes[i].balances.char_def)
                setEnemHp(be.clashes[i].balances.enem_hp)
                setEnemDef(be.clashes[i].balances.enem_def)
                console.log(`Im running ${i} times!`)
                if (i < be.clashes.length) i++
                if (i == be.clashes.length) {
                    setIsPlaying(false)
                    showResults(be.clashes[i - 1].balances)
                    clearInterval(duelInterval)
                }
            }, 2000)
        }
        return () => {
            clearInterval(duelInterval)
        }
    }, [isPlaying])

    React.useEffect(() => {
        if (props.battleId) {
            setBalancesToFull(props.battleEvents)
        }
    }, [props.battleId])

    const setBalancesToFull = (be) => {
        setCharHp(be.char.hp)
        setCharDef(be.char.def)
        setCharMaxHp(be.char.hp)
        setCharMaxDef(be.char.def)

        setEnemHp(be.enem.hp)
        setEnemDef(be.enem.def)
        setEnemMaxHp(be.enem.hp)
        setEnemMaxDef(be.enem.def)
    }

    const showResults = (balances) => {
        if(balances.char_hp == 0 && balances.enem_hp == 0){
            setResult(2)
        }
        if(balances.char_hp == 0 && balances.enem_hp > 0){
            setResult(0)
        }
        if(balances.char_hp > 0 && balances.enem_hp == 0){
            setResult(1)
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Dialog
                open={props.openReplay}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <Container fixed justify="center" align="center" maxWidth='xs'>
                    <DialogContent sx={{ color: 'primary.main' }}>
                        <LoadingBackdrop isLoading={isLoading} loadingText={loadingText} />
                        <Grid container align='center' justify='center'>
                            <Grid item xs={12}>
                                <Typography variant='h6' sx={{ mb: 2 }}>BATTLE REPLAY</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Image
                                    // src={eqptImg}
                                    // alt={eqptName}
                                    width={90}
                                    height={90}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Image
                                    // src={eqptImg}
                                    // alt={eqptName}
                                    width={90}
                                    height={90}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h6' sx={{ mb: 2 }}>{result == 0 ? 'Lost =(' : result == 2 ? 'Draw =|' : 'Won =)'}</Typography>
                            </Grid>
                            <Grid item container xs={12} spacing={2}>
                                <Grid item xs={6}>
                                    {
                                        <LinearProgress
                                            variant='determinate'
                                            color='error'
                                            value={(charHp / charMaxHp) * 100} />
                                    }
                                </Grid>
                                <Grid item xs={6}>
                                    {<LinearProgress variant='determinate' color='error' value={(enemHp / enemMaxHp) * 100} />}
                                </Grid>
                            </Grid>
                            <Grid item container xs={12} spacing={2}>
                                <Grid item xs={6}>
                                    {<LinearProgress variant='determinate' value={(charDef / charMaxDef) * 100} />}
                                </Grid>
                                <Grid item xs={6}>
                                    {<LinearProgress variant='determinate' value={(enemDef / enemMaxDef) * 100} />}
                                </Grid>
                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => props.setOpenReplay(false)}>Close</Button>
                        <Button onClick={handleSkip}>Skip</Button>
                        <Button onClick={handlePlay}>Play</Button>
                    </DialogActions>
                </Container>
            </Dialog>
        </React.Fragment>
    );
}