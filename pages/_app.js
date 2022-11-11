import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import '../styles/globals.css';

import networks from '../random-clash-contracts/app-config/networks';

import {
  WagmiConfig,
  createClient,
  configureChains,
  chain,
  defaultChains,
  useConnect,
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
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [connectedWallet, setConnectedWallet] = React.useState('')
  const [characterSelected, setCharacterSelected] = React.useState(0)
  const [characterIcon, setCharacterIcon] = React.useState('')

  React.useEffect(()=>{
    setCharacterSelected(parseInt(localStorage.getItem('characterSelected')))
    setCharacterIcon(localStorage.getItem('characterIcon'))
  },[])

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
          />
          <BottomBar 
            setConnectedWallet={setConnectedWallet}
          />
        </ThemeProvider>
      </CacheProvider>
    </WagmiConfig>
  );
};

export default MyApp;