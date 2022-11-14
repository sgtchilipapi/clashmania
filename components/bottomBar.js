import * as React from 'react';
import Router from 'next/router'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import BalconyIcon from '@mui/icons-material/Balcony';
import StadiumIcon from '@mui/icons-material/Stadium';
import WalletIcon from '@mui/icons-material/Wallet';

export default function BottomBar() {
  const [value, setValue] = React.useState(0);

  const toCharacters = () => Router.push('/characters')
  const toEquipments = () => Router.push('/equipments')
  const toWallet = () => Router.push('/wallet')
  const toDungeons = () => Router.push('/dungeons')
  const toArena = () => Router.push('/arena')

  return (
    <Box sx={{ width: 'auto', position: 'fixed', bottom: 0, left: 0, right: 0}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{backgroundColor: 'info.dark' }}
      >
        <BottomNavigationAction onClick={toCharacters} label="CTRS" icon={<GroupIcon />}/>
        <BottomNavigationAction onClick={toEquipments} label="INVTY" icon={<BusinessCenterIcon />} />
        <BottomNavigationAction onClick={toDungeons} label="DUNGEONS" icon={<BalconyIcon />} />
        <BottomNavigationAction onClick={toArena} label="ARENA" icon={<StadiumIcon />} />
        <BottomNavigationAction onClick={toWallet} label="WLET" icon={<WalletIcon />} />
      </BottomNavigation>
    </Box>
  );
}