import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import '../styles/globals.css';

import EquipmentDialog from '../components/equipments/equipmentDetails';

import networks from '../random-clash-contracts/app-config/networks';

import {
  WagmiConfig,
  createClient,
  configureChains,
  chain,
  defaultChains,
  useConnect,
  useAccount
} from 'wagmi'

import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import TopBar from '../components/topBar';
import BottomBar from '../components/bottomBar';

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygonMumbai],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: networks.endpoint.http,
      }),
    }),
    jsonRpcProvider({
      rpc: () => ({
        http: 'https://rpc.ankr.com/polygon_mumbai',
      }),
    }),
  ],
)

const client = createClient({
  autoConnect: false,
  provider,
  webSocketProvider,
})

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const {address} = useAccount()
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [characterSelected, setCharacterSelected] = React.useState(undefined)
  const [equipmentSelected, setEquipmentSelected] = React.useState(undefined)
  const [characterIcon, setCharacterIcon] = React.useState(undefined)
  const [equipmentOpenDialog, setEquipmentOpenDialog] = React.useState(false)
  const [equipmentsUpdated, setEquipmentsUpdated] = React.useState(0)

  React.useEffect(()=>{
    if(localStorage.getItem(`characterSelected-${address}`)){
      setCharacterSelected(localStorage.getItem(`characterSelected-${address}`))
    }
    if(localStorage.getItem(`characterIcon-${address}`)){
      setCharacterIcon(localStorage.getItem(`characterIcon-${address}`))
    }
    if(!address){
      setCharacterSelected(undefined)
      setCharacterIcon(undefined)
    }
  },[,address])

  return (
    <WagmiConfig client={client}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <TopBar
            characterIcon={characterIcon}
          />
          <Component {...pageProps}
            characterSelected={characterSelected}
            setCharacterSelected={setCharacterSelected}
            setCharacterIcon={setCharacterIcon}
            equipmentSelected={equipmentSelected}
            setEquipmentSelected={setEquipmentSelected}
            equipmentOpenDialog={equipmentOpenDialog}
            setEquipmentOpenDialog={setEquipmentOpenDialog}
            equipmentsUpdated={equipmentsUpdated}
            setEquipmentsUpdated={setEquipmentsUpdated}
          />
          <BottomBar
          />
          <EquipmentDialog
              equipmentSelected={equipmentSelected}
              equipmentOpenDialog={equipmentOpenDialog}
              setEquipmentOpenDialog={setEquipmentOpenDialog}
              characterSelected={characterSelected}
              setCharacterSelected={setCharacterSelected}
              setEquipmentsUpdated={setEquipmentsUpdated}
            />
        </ThemeProvider>
      </CacheProvider>
    </WagmiConfig>
  );
};

export default MyApp;