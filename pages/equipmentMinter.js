import * as React from 'react';
import Router from 'next/router'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import { Button, Typography, Avatar } from '@mui/material';
import Image from 'next/image'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LoadingBackdrop from '../components/backdrop';

import * as eqpt_mint_lib from "../components/library/equipmentMintingLib"
import * as recipe_lib from "../components/library/craftingRecipeLib"
import * as c_apis from "../random-clash-contracts/api/contracts/contracts-api"

export default function FixedContainer(props) {
    const [isLoading, setIsLoading] = React.useState(false)
    const [loadingText, setLoadingText] = React.useState('Loading...')
    const [isUpdating, setIsUpdating] = React.useState(false)

    const [eqptIndex, setEqptIndex] = React.useState(0)
    const [requestExists, setRequestExists] = React.useState(false)
    const [readyToMint, setReadyToMint] = React.useState(false)

    const [mainMaterial, setMainMaterial] = React.useState(0)
    const [indirectMaterial, setIndirectMaterial] = React.useState(1)
    const [catalyst, setCatalyst] = React.useState(0)
    const [mainAmount, setMainAmount] = React.useState(0)
    const [indirectAmount, setIndirectAmount] = React.useState(0)
    const [catalystAmount, setCatalystAmount] = React.useState(0)
    const [mainTag, setMainTag] = React.useState(0)
    const [indirectTag, setIndirectTag] = React.useState(0)
    const [catalystTag, setCatalystTag] = React.useState(0)

    const [mainBalance, setMainBalance] = React.useState(0)
    const [indirectBalance, setIndirectBalance] = React.useState(0)
    const [catalystBalance, setCatalystBalance] = React.useState(0)

    const [mainAllowance, setMainAllowance] = React.useState(0)
    const [indirectAllowance, setIndirectAllowance] = React.useState(0)
    const [catalystAllowance, setCatalystAllowance] = React.useState(0)

    React.useEffect(() => {
        getRequest()
        getUserBalances()
        getUserAllowances()
    }, [])

    React.useEffect(() => {
        getRecipe()
    }, [eqptIndex])

    const prevEqpt = () => setEqptIndex(eqptIndex > 0 ? eqptIndex => eqptIndex - 1 : 0)
    const nextEqpt = () => setEqptIndex(eqptIndex < 3 ? eqptIndex => eqptIndex + 1 : 3)

    const getRequest = async () => {
        setLoadingText('Loading previous equipment mint request...')
        setIsLoading(true)
        const request = await c_apis.periphery.routers.eqpt_minter.getRequest(localStorage.getItem('wallet'))
        if (parseInt(request.request_id) > 0) {
            setRequestExists(true)
            getFulfillment(request.request_id)
        } else {
            setIsLoading(false)
        }
    }

    const getFulfillment = async (request_id) => {
        const request = await c_apis.periphery.chainlink.eqpts_vrf.getRequestStatus(request_id)
        if (request.fulfilled) {
            setReadyToMint(true)
            setIsLoading(false)
        } else {
            setIsLoading(true)
            listenToVRF()
        }
    }

    const sendRequest = async () => {
        try {
            setLoadingText('Waiting for equipment crafting request confirmation...')
            setIsLoading(true)
            await c_apis.periphery.routers.eqpt_minter.requestEquipment(eqptIndex, 1, '0')
            setRequestExists(true)
            listenToVRF()
        }
        catch {
            setIsLoading(false)
            alert('Failed to submit equipment crafting request! You might have already submitted a request that should be minted first.')
        }
    }

    const mint = async () => {
        let listenerContract = await listenToMints()
        try {
            setLoadingText('Waiting for mint transaction confirmation...')
            setIsLoading(true)
            const mint_receipt = await c_apis.periphery.routers.eqpt_minter.mintEquipments()
            setRequestExists(false)
            setReadyToMint(false)
            setEqptIndex(0)
        }
        catch {
            listenerContract.removeAllListeners("EquipmentMinted");
            setIsLoading(false)
            alert('Failed to mint equipment! You might not have any request to mint! Please submit a request first.')
        }
    }

    const listenToVRF = async () => {
        setLoadingText('Waiting for VRF fulfillment...')
        const contract = await c_apis.periphery.chainlink.eqpts_vrf.getListener()
        contract.on("RequestFulfilled", (request_id, numWords, user, experimental) => {
            console.log(contract.listeners("RequestFulfilled"))
            if (user == localStorage.getItem('wallet')) {
                setReadyToMint(true)
                console.log('Request has been fulfilled by the VRF! The equipment NFT is ready to be minted!')
                contract.removeAllListeners("RequestFulfilled");
                console.log(contract.listeners("RequestFulfilled"))
                setIsLoading(false)
            }
        })
    }

    ///This function listens to any mint events emitted from the Equipments NFT contract for experimental request only.
    const listenToMints = async () => {
        const contract = await c_apis.core.eqpts.getListener()
        contract.on("EquipmentMinted", (id, address, eqpt_props, eqpt_stats) => {
            if (address == localStorage.getItem('wallet')) {
                const equipment = {
                    id: id,
                    idNum: parseInt(id),
                    equipment_type: parseInt(eqpt_props.equipment_type),
                    rarity: parseInt(eqpt_props.rarity),
                    dominant_stat: parseInt(eqpt_props.dominant_stat),
                    extremity: parseInt(eqpt_props.extremity),
                    atk: parseInt(eqpt_stats.atk),
                    def: parseInt(eqpt_stats.def),
                    eva: parseInt(eqpt_stats.eva),
                    hp: parseInt(eqpt_stats.hp),
                    pen: parseInt(eqpt_stats.pen),
                    crit: parseInt(eqpt_stats.crit),
                    luk: parseInt(eqpt_stats.luck),
                    res: parseInt(eqpt_stats.energy_restoration)
                }
                contract.removeAllListeners("EquipmentMinted");
                getRequest()
                props.setEquipmentSelected(equipment)
                props.setEquipmentOpenDialog(true)
                setIsLoading(false)
            }
        })
        console.log('listening to mints...')
        return contract
    }

    const getRecipe = () => {
        const recipe = recipe_lib.getRecipe(eqptIndex)
        setMainMaterial(recipe.main_material)
        setIndirectMaterial(recipe.indirect_material)
        setCatalyst(recipe.catalyst)
        setMainAmount(recipe.main_material_amount)
        setIndirectAmount(recipe.indirect_material_amount)
        setCatalystAmount(recipe.catalyst_amount)
        setMainTag(recipe.main_tag)
        setIndirectTag(recipe.indirect_tag)
        setCatalystTag(recipe.catalyst_tag)
        getUserBalances(recipe.main_material, recipe.indirect_material, recipe.catalyst)
        getUserAllowances(recipe.main_material, recipe.indirect_material, recipe.catalyst)
    }

    const getUserBalances = (main, indirect, catalyst) => {
        if (main != undefined && indirect != undefined && catalyst != undefined) {
            getMainBalance(main)
            getIndirectBalance(indirect)
            getCatalystBalance(catalyst)
        }
    }

    const getMainBalance = async (material_index) => {
        setIsUpdating(true)
        const userAddress = localStorage.getItem('wallet')
        const bal = await c_apis.core.tokens.balanceOf(recipe_lib.getMaterialName(material_index), userAddress)
        setMainBalance(bal)
        setIsUpdating(false)
    }

    const getIndirectBalance = async (material_index) => {
        const userAddress = localStorage.getItem('wallet')
        const bal = await c_apis.core.tokens.balanceOf(recipe_lib.getMaterialName(material_index), userAddress)
        setIndirectBalance(bal)
    }

    const getCatalystBalance = async (catalyst_index) => {
        const userAddress = localStorage.getItem('wallet')
        const bal = await c_apis.core.tokens.balanceOf(recipe_lib.getCatalystName(catalyst_index), userAddress)
        setCatalystBalance(bal)
    }

    const getUserAllowances = (main, indirect, catalyst) => {
        if (main != undefined && indirect != undefined && catalyst != undefined) {
            getMainAllowance(main)
            getIndirectAllowance(indirect)
            getCatalystAllowance(catalyst)
        }
    }

    const getMainAllowance = async (material_index) => {
        const userAddress = localStorage.getItem('wallet')
        const allowance = await c_apis.core.tokens.allowance(recipe_lib.getMaterialName(material_index), userAddress, 'equipment_minter')
        setMainAllowance(allowance)
        
    }

    const getIndirectAllowance = async (material_index) => {
        const userAddress = localStorage.getItem('wallet')
        const allowance = await c_apis.core.tokens.allowance(recipe_lib.getMaterialName(material_index), userAddress, 'equipment_minter')
        setIndirectAllowance(allowance)
    }

    const getCatalystAllowance = async (catalyst_index) => {
        const userAddress = localStorage.getItem('wallet')
        const allowance = await c_apis.core.tokens.allowance(recipe_lib.getCatalystName(catalyst_index), userAddress, 'equipment_minter')
        setCatalystAllowance(allowance)
    }

    const getEnoughBalance = () => {
        let enough = true
        if(mainBalance < mainAmount || indirectBalance < indirectAmount || catalystBalance < catalystAmount) enough = false
        return enough
    }

    const getEnoughAllowance = () => {
        let enough = true
        if(mainAllowance < mainAmount || indirectAllowance < indirectAmount || catalystAllowance < catalystAmount) enough = false
        return enough
    }

    const mintButton = (
        readyToMint ? 
            <Button onClick={mint} variant="outlined">Mint</Button> :
        getEnoughBalance() ? 
            getEnoughAllowance() ? <Button onClick={sendRequest} variant="outlined" disabled={requestExists}>Craft</Button> :
            <Button onClick={mint} variant="outlined">Approve Tokens</Button> :
        <Button onClick={mint} variant="outlined" disabled={true}>Not enough balance</Button>
            
    )


    return (
        <React.Fragment>
            <CssBaseline />
            <LoadingBackdrop isLoading={isLoading} loadingText={loadingText} />
            <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', color: 'primary.main' }}>
                <Container fixed justify="center" align="center" maxWidth='xs'>
                    <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', color: 'primary.dark' }} justify="center" align="center">
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h6">Equipment Crafting</Typography>
                            </Grid>

                            <Grid item container xs={2} justify="center" align="center">
                                <Button onClick={prevEqpt} disabled={readyToMint ? true : false}>{<ArrowBackIosIcon />}</Button>
                            </Grid>
                            <Grid item xs={8} align="center">
                                <Image
                                    src={eqpt_mint_lib.equipmentImages(eqptIndex)}
                                    alt={eqpt_mint_lib.equipmentNames(eqptIndex)}
                                    width={140}
                                    height={140}
                                />
                            </Grid>
                            <Grid item container xs={2} justify="center" align="center">
                                <Button onClick={nextEqpt} disabled={readyToMint ? true : false}>{<ArrowForwardIosIcon />}</Button>
                            </Grid>

                            <Grid item xs={12} sx={{ mb: 1 }}>
                                <Typography variant="h6" sx={{ display: readyToMint ? 'none' : 'inline', ml: 1, mr: 1 }}>{`Crafting ${eqpt_mint_lib.equipmentNames(eqptIndex)}`}</Typography>
                            </Grid>



                            <Grid item xs={12} sx={{ mb: 1 }}>
                                <Typography variant="body" sx={{ display: readyToMint ? 'none' : 'inline', ml: 1, mr: 1 }}>{eqpt_mint_lib.equipmetDescription(eqptIndex)}</Typography>
                            </Grid>

                            <Grid item container xs={12} sx={{ mt: 1 }} align='center' justify='center'>
                                <Grid item xs={12}>
                                    <Typography variant="body" sx={{ display: readyToMint ? 'inline' : 'none', ml: 1, mr: 1 }}>
                                        {`Congratulations! The equipment is ready to be minted! Please click mint below.`}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item container xs={12} align='center' justify='center' sx={{ visibility: readyToMint ? 'hidden' : 'visible' }}>
                                <Grid item xs={12} sx={{ mb: 2 }}>
                                    <Typography variant='body'>Required Materials:</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Avatar />
                                    <Typography variant='body'>{`${mainAmount} ${mainTag}`}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Avatar />
                                    <Typography variant='body'>{`${indirectAmount} ${indirectTag}`}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Avatar />
                                    <Typography variant='body'>{`${catalystAmount} ${catalystTag}`}</Typography>
                                </Grid>
                            </Grid>

                            <Grid item container xs={12} align='center' justify='center' sx={{ visibility: readyToMint ? 'hidden' : 'visible' }}>
                                <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Typography variant='body'>Your Balances:</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant='body'>{`${mainTag}`}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant='body'>{`${indirectTag}`}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant='body'>{`${catalystTag}`}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item container xs={12} align='center' justify='center' sx={{ visibility: readyToMint ? 'hidden' : 'visible' }}>
                                <Grid item xs={4}>
                                    <Typography variant='body' color={mainBalance < mainAmount ? 'red' : 'primary.main'}>{isUpdating ? `---`:`${mainBalance}`}</Typography>
                                </Grid>
                                <Grid item xs={4}>

                                    <Typography variant='body' color={indirectBalance < indirectAmount ? 'red' : 'primary.main'}>{isUpdating ? `---`:`${indirectBalance}`}</Typography>
                                </Grid>
                                <Grid item xs={4}>

                                    <Typography variant='body' color={catalystBalance < catalystAmount ? 'red' : 'primary.main'}>{isUpdating ? `---`:`${catalystBalance}`}</Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sx={{ mt: 2 }}>
                                {mintButton}
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    );
}