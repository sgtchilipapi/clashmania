import * as React from 'react';
import Link from 'next/link';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Grid, Button, Typography } from '@mui/material';
import EquipmentList from '../components/equipments/equipmentList';

import * as s_apis from "../random-clash-contracts/api/subgraphs/subgraphs-api"
import EquipmentDialog from '../components/equipments/equipmentDetails';

export default function FixedContainer(props) {
  const [totalOwned, setTotalOwned] = React.useState(0)
  const [equipments, setEquipments] = React.useState([])
  const [equipmentSelected, setEquipmentSelected] = React.useState({})
  const [equipmentOpenDialog, setEquipmentOpenDialog] = React.useState(false)

  React.useEffect(() => {
    getEquipmentsViaSubgraph()
  }, [])

  const getEquipmentsViaSubgraph = async () => {
    const data = await s_apis.core.eqpts.getEquipmentsOwned(localStorage.getItem('wallet'))
    console.log(data)
    setEquipments(data)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ bgcolor: '#cfe8fc', height: '200vh', color: 'primary.main' }}>
        <Container fixed justify="center" align="center" maxWidth='xs'>
          <Box sx={{ bgcolor: '#cfe8fc', height: '200vh', color: 'primary.main' }}>
            <Typography variant='h6' sx={{ mb: 1 }}>YOUR EQUIPMENTS</Typography>
            <EquipmentDialog equipmentSelected={equipmentSelected} equipmentOpenDialog={equipmentOpenDialog} setEquipmentOpenDialog={setEquipmentOpenDialog} />
            <Grid container align='center' justify='center'>
              <Grid item xs={12}>
                <EquipmentList
                  equipments={equipments}
                  setEquipmentSelected={setEquipmentSelected}
                  setEquipmentOpenDialog={setEquipmentOpenDialog}
                />
              </Grid>
            </Grid>
            <Link href="/characterMinter"><Button variant='outlined' sx={{ mt: 2 }}>Craft an Item</Button></Link>
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
}