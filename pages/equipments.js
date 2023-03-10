import * as React from 'react';
import Link from 'next/link';
import { useAccount } from 'wagmi'

import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Grid, Button, Typography } from '@mui/material';

import EquipmentList from '../components/equipments/equipmentList';
import LoadingBackdrop from '../components/backdrop';
import ConnectButton from '../components/wallet/connectButton';

import * as s_apis from "../clashmania-contracts/api/subgraphs/subgraphs-api"

export default function FixedContainer(props) {
  const { address } = useAccount()
  const [isLoading, setIsLoading] = React.useState(false)
  const [loadingText, setLoadingText] = React.useState('loading data...')

  const [equipments, setEquipments] = React.useState([])
  
  React.useEffect(() => {
    getEquipmentsViaSubgraph()
  }, [,address])

  const getEquipmentsViaSubgraph = async () => {
    setIsLoading(true)
    setLoadingText('Loading all of your equipments...')
    const data = await s_apis.core.eqpts.getEquipmentsOwned(address)
    setEquipments(data)
    setIsLoading(false)
  }

  const craftButton = (
    address ? <Link href="/equipmentMinter"><Button variant='outlined' sx={{ mt: 2,color:'white' }}>Craft an Item</Button></Link> :
    <ConnectButton />
  )

  return (
    <React.Fragment>
      <CssBaseline />
      <LoadingBackdrop isLoading={isLoading} loadingText={loadingText} />
      <Box sx={{ bgcolor: '#cfe8fc', height: `${equipments.length < 10 ? 100: (equipments.length * 10)}vh`, color: 'black', backgroundImage: "url('/images/backgrounds/equipments.png')", backgroundSize: "cover" }}>
        <Container fixed justify="center" align="center" maxWidth='xs'>
          <Box sx={{ bgcolor: 'none', height: `${equipments.length < 10 ? 100: (equipments.length * 10)}vh`, color:'primary.main', textShadow:'2px 2px #ffffff' }}>
            <Typography variant='h6' sx={{ mb: 1 }}>YOUR EQUIPMENTS</Typography>
            <Grid container align='center' justify='center'  sx={{mb:2}}>
              <Grid item container xs={12}>
                <EquipmentList
                  equipments={equipments}
                  setEquipmentSelected={props.setEquipmentSelected}
                  setEquipmentOpenDialog={props.setEquipmentOpenDialog}
                />
              </Grid>
            </Grid>
            {craftButton}
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
}