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
  const [characterSelected, setCharacterSelected] = React.useState('C')
  
  return (
    <WagmiConfig client={client}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <TopBar 
            characterSelected={characterSelected}
            setCharacterSelected={setCharacterSelected}
          />        
          <Component {...pageProps}
            characterSelected={characterSelected}
            setCharacterSelected={setCharacterSelected}
          />
          <BottomBar />
        </ThemeProvider>
      </CacheProvider>
    </WagmiConfig>
  );
};

export default MyApp;