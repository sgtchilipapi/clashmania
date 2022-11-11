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
        <BottomNavigationAction label="INVTY" icon={<BusinessCenterIcon />} />
        <BottomNavigationAction label="DUNGEONS" icon={<BalconyIcon />} />
        <BottomNavigationAction label="ARENA" icon={<StadiumIcon />} />
        <BottomNavigationAction label="WLET" icon={<WalletIcon />} />
      </BottomNavigation>
    </Box>
  );
}