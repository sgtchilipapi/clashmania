import * as React from 'react';
import Image from 'next/image'
import {Howl, Howler} from 'howler';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Grid, Typography, LinearProgress, Divider, Button, Dialog, DialogActions, DialogContent, Slide } from '@mui/material';

import LoadingBackdrop from '../backdrop'
import CharacterAnimator from './characterAnimator';

import * as dungeons_lib from "../library/dungeonsLib"
import * as sprites_lib from "../library/spriteRef"
import * as crafting_recipe from "../library/craftingRecipeLib"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function BattleReplayDialog(props) {
    const [isLoading, setIsLoading] = React.useState(false)
    const [loadingText, setLoadingText] = React.useState('loading data...')
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [playbackTrigger, setPlaybackTrigger] = React.useState(0)

    const [charExp, setCharExp] = React.useState(0)
    const [tier, setTier] = React.useState(0)
    //game states
    const [charHp, setCharHp] = React.useState(0)
    const [charDef, setCharDef] = React.useState(0)
    const [charMaxHp, setCharMaxHp] = React.useState(0)
    const [charMaxDef, setCharMaxDef] = React.useState(0)
    const [enemHp, setEnemHp] = React.useState(0)
    const [enemDef, setEnemDef] = React.useState(0)
    const [enemMaxHp, setEnemMaxHp] = React.useState(0)
    const [enemMaxDef, setEnemMaxDef] = React.useState(0)

    const [charAttackSprite, setCharAttackSprite] = React.useState('')
    const [enemAttackSprite, setEnemAttackSprite] = React.useState('')
    const [charReactionSprite, setCharReactionSprite] = React.useState('')
    const [enemReactionSprite, setEnemReactionSprite] = React.useState('')
    const [charAttackFrames, setCharAttackFrames] = React.useState(0)
    const [enemAttackFrames, setEnemAttackFrames] = React.useState(0)
    const [charReactionFrames, setCharReactionFrames] = React.useState(0)
    const [enemReactionFrames, setEnemReactionFrames] = React.useState(0)
    const [charWidth, setCharWidth] = React.useState('')
    const [enemWidth, setEnemWidth] = React.useState('')
    const [charFacing, setCharFacing] = React.useState('')
    const [enemFacing, setEnemFacing] = React.useState('')

    const [result, setResult] = React.useState(0)
    const [expGained, setExpGained] = React.useState(0)
    const [statAffected, setStatAffected] = React.useState(0)
    const [statGainedAmount, setStatGainedAmount] = React.useState(0)
    const [materialGained, setMaterialGained] = React.useState(0)
    const [materialAmount, setMaterialAmount] = React.useState(0)
    const [snapGained, setSnapGained] = React.useState(0)
    const [showResult, setShowResult] = React.useState(false)

    let duelInterval

    const handleClose = () => {
        props.setReplayOpen(false);
    };

    const handleSkip = () => {
        setResult(0)
        setShowResult(false)
        setIsPlaying(false)
        if (props.battleId) {
            const be = props.battleEvents
            const i = be.clashes.length - 1
            setCharHp(be.clashes[i].balances.char_hp)
            setCharDef(be.clashes[i].balances.char_def)
            setEnemHp(be.clashes[i].balances.enem_hp)
            setEnemDef(be.clashes[i].balances.enem_def)
            setResult(be.battle_info.result)
            setPlaybackTrigger(playbackTrigger => playbackTrigger + i)
            setShowResult(true)
        }
    }

    const handlePlay = () => {
        props.setTrackSelected(4)
        setResult(0)
        setShowResult(false)
        setPlaybackTrigger(0)
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
                

                ///set character sprite reaction
                if (be.clashes[i].enem.evaded) {
                    setCharReactionSprite(sprites_lib.getCharSpriteSource(be.char.character_class, 'idle'))
                    setCharReactionFrames(sprites_lib.getCharSpriteFrames(be.char.character_class).idle)
                }
                if (!be.clashes[i].enem.evaded) {
                    setCharReactionSprite(sprites_lib.getCharSpriteSource(be.char.character_class, 'idle'))
                    setCharReactionFrames(sprites_lib.getCharSpriteFrames(be.char.character_class).hurt)
                }
                if (be.clashes[i].balances.char_hp == 0) {
                    setCharReactionSprite(sprites_lib.getCharSpriteSource(be.char.character_class, 'death'))
                    setCharReactionFrames(sprites_lib.getCharSpriteFrames(be.char.character_class).death)
                }

                ///set enemy sprite reaction
                if (be.clashes[i].char.evaded) {
                    setEnemReactionSprite(sprites_lib.getEnemSpriteSource(be.battle_info.dungeon_type, be.battle_info.tier, 'idle'))
                    setEnemReactionFrames(sprites_lib.getEnemSpriteFrames(be.battle_info.dungeon_type, be.battle_info.tier).idle)
                }
                if (!be.clashes[i].char.evaded) {
                    setEnemReactionSprite(sprites_lib.getEnemSpriteSource(be.battle_info.dungeon_type, be.battle_info.tier, 'idle'))
                    setEnemReactionFrames(sprites_lib.getEnemSpriteFrames(be.battle_info.dungeon_type, be.battle_info.tier).hurt)
                }
                if (be.clashes[i].balances.enem_hp == 0) {
                    setEnemReactionSprite(sprites_lib.getEnemSpriteSource(be.battle_info.dungeon_type, be.battle_info.tier, 'death'))
                    setEnemReactionFrames(sprites_lib.getEnemSpriteFrames(be.battle_info.dungeon_type, be.battle_info.tier).death)
                }

                console.log(`Im running ${i} times!`)
                if (i < be.clashes.length) {
                    setPlaybackTrigger(playbackTrigger => playbackTrigger + i)
                    i++
                }
                if (i == be.clashes.length) {
                    if (be.clashes[i - 1].balances.char_hp > 0) {
                        setCharReactionSprite(sprites_lib.getCharSpriteSource(be.char.character_class, 'idle'))
                        setCharReactionFrames(sprites_lib.getCharSpriteFrames(be.char.character_class).idle)
                    }
                    if (be.clashes[i - 1].balances.enem_hp > 0) {
                        setEnemReactionSprite(sprites_lib.getEnemSpriteSource(be.battle_info.dungeon_type, be.battle_info.tier, 'idle'))
                        setEnemReactionFrames(sprites_lib.getEnemSpriteFrames(be.battle_info.dungeon_type, be.battle_info.tier).idle)
                    }
                    setIsPlaying(false)
                    setResult(be.battle_info.result)
                    setShowResult(true)
                    clearInterval(duelInterval)
                }
            }, 1200)
        }
        return () => {
            clearInterval(duelInterval)
        }
    }, [isPlaying])

    React.useEffect(() => {
        if (props.battleId) {
            const be = props.battleEvents
            setBalancesToFull(be)
            setExpGained(be.battle_info.exp_gained)
            setStatAffected(dungeons_lib.dungeons[be.battle_info.dungeon_type].stat_given)
            setStatGainedAmount(be.battle_info.stat_amount)
            setMaterialGained(crafting_recipe.getMaterialTicker(be.battle_info.material))
            setMaterialAmount(be.battle_info.amount)
            setSnapGained(be.battle_info.snap_amount)
            setIsPlaying(false)
            setShowResult(false)
            setCharExp(be.char.exp)
            setTier(be.battle_info.tier)

            setCharAttackSprite(sprites_lib.getCharSpriteSource(be.char.character_class, 'attack'))
            setCharAttackFrames(sprites_lib.getCharSpriteFrames(be.char.character_class).attack)
            setCharWidth(sprites_lib.getCharSpriteFrames(be.char.character_class).width)
            setCharFacing(sprites_lib.getCharSpriteFrames(be.char.character_class).facing)
            setCharReactionSprite(sprites_lib.getCharSpriteSource(be.char.character_class, 'idle'))
            setCharReactionFrames(sprites_lib.getCharSpriteFrames(be.char.character_class).idle)
            
            setEnemAttackSprite(sprites_lib.getEnemSpriteSource(be.battle_info.dungeon_type, be.battle_info.tier, 'attack'))
            setEnemAttackFrames(sprites_lib.getEnemSpriteFrames(be.battle_info.dungeon_type, be.battle_info.tier).attack)
            setEnemWidth(sprites_lib.getEnemSpriteFrames(be.battle_info.dungeon_type, be.battle_info.tier).width)
            setEnemFacing(sprites_lib.getEnemSpriteFrames(be.battle_info.dungeon_type, be.battle_info.tier).facing)
            setEnemReactionSprite(sprites_lib.getEnemSpriteSource(be.battle_info.dungeon_type, be.battle_info.tier, 'idle'))
            setEnemReactionFrames(sprites_lib.getEnemSpriteFrames(be.battle_info.dungeon_type, be.battle_info.tier).idle)

            setPlaybackTrigger(playbackTrigger => playbackTrigger + 1)
        }
    }, [props.battleId])

    const setBalancesToFull = (be) => {
        setCharHp(be.char.hp)
        setCharDef(be.char.def)
        setCharMaxHp(be.char.hp)
        setCharMaxDef(be.char.def)

        setEnemMaxHp(charExp < 100 && tier == 0 ? (be.enem.hp * 4) : be.enem.hp)
        setEnemHp(be.enem.hp)
        setEnemDef(be.enem.def)
        setEnemMaxDef(be.enem.def)
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
                    <DialogContent sx={{ color: 'primary.main'}}>
                        <LoadingBackdrop isLoading={isLoading} loadingText={loadingText} />
                        <Grid container align='center' justify='center'>
                            <Grid item xs={12}>
                                <Typography variant='h6' sx={{ mb: 2 }}>BATTLE REPLAY</Typography>
                            </Grid>
                            <Grid item container xs={6} justifyContent='end' sx={{mb:1}}>
                                <CharacterAnimator
                                    attackSpriteSource={charAttackSprite}
                                    attackMaxFrames={charAttackFrames}
                                    frameWidth={charWidth}
                                    reactionSpriteSource={charReactionSprite}
                                    reactionMaxFrames={charReactionFrames}
                                    playbackTrigger={playbackTrigger}
                                    hp={charHp}
                                    style={{ transform: charFacing == 'left' ? `scaleX(-1)`: `scaleX(1)` }}
                                />
                            </Grid>
                            <Grid item container xs={6} justifyContent='left' sx={{mb:1}}>
                            <CharacterAnimator
                                    attackSpriteSource={enemAttackSprite}
                                    attackMaxFrames={enemAttackFrames}
                                    frameWidth={enemWidth}
                                    reactionSpriteSource={enemReactionSprite}
                                    reactionMaxFrames={enemReactionFrames}
                                    playbackTrigger={playbackTrigger}
                                    hp={enemHp}
                                    style={{ transform: enemFacing == 'left' ? `scaleX(1)`: `scaleX(-1)` }}
                                />
                            </Grid>

                            <Grid item container xs={12} spacing={2}>
                                <Grid item xs={6}>
                                    <LinearProgress variant='determinate' color='error' value={charHp / charMaxHp * 100} sx={{ height: 15, width:'80%'  }}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <LinearProgress variant='determinate' color='error' value={enemHp / enemMaxHp  * 100} sx={{ height: 15, width:'80%'  }}/>
                                </Grid>
                            </Grid>
                            <Grid item container xs={12} spacing={2}>
                            <Grid item xs={6}>
                                    <LinearProgress variant='determinate' color='inherit' value={(charDef / charMaxDef) * 100} sx={{ height: 15, width:'80%', mt:.2 }}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <LinearProgress variant='determinate' color='inherit' value={(enemDef / enemMaxDef) * 100} sx={{ height: 15, width:'80%', mt:.2  }}/>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{ visibility: showResult ? 'visible' : 'hidden' }}>
                            <Grid item xs={12}>
                                <Typography variant='body1'>{result == 0 ? 'DEFEAT' : result == 2 ? 'DRAW' : 'VICTORY!'}</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant='caption'>{`Experience Gained: ${expGained} points!`}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='caption'>{`Stat Gained: ${statGainedAmount} ${statAffected}!`}</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant='caption'>{`Obtained: ${materialAmount} ${materialGained} and ${snapGained} SNAP Tokens!`}</Typography>
                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Grid item container xs={12}>
                            <Grid item container xs={3}>
                                <Button onClick={() => props.setOpenReplay(false)}>Close</Button>
                            </Grid>
                            <Grid item container xs={9} justifyContent="flex-end">
                                <Button onClick={handleSkip} variant='outlined' sx={{ mr: 1 }}>Skip</Button>
                                <Button onClick={handlePlay} variant='outlined'>Play</Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Container>
            </Dialog>
        </React.Fragment>
    );
}