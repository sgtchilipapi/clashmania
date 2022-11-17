import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import '../styles/globals.css';
import { Howl, Howler } from 'howler';

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
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { address } = useAccount()

  const [characterSelected, setCharacterSelected] = React.useState(undefined)
  const [characterIcon, setCharacterIcon] = React.useState(undefined)

  const [equipmentSelected, setEquipmentSelected] = React.useState(undefined)
  const [equipmentOpenDialog, setEquipmentOpenDialog] = React.useState(false)
  const [equipmentsUpdated, setEquipmentsUpdated] = React.useState(0)

  const [dungeonSelected, setDungeonSelected] = React.useState(0)
  const [isMutedSound, setIsMutedSound] = React.useState(false)
  const [isMusicStopped, setIsMusicStopped] = React.useState(false)
  const [trackSelected, setTrackSelected] = React.useState(0)

  const musicTrack = [
    '/sfx/bgm/home.mp3', //index
    '/sfx/bgm/characters.mp3', //characters
    '/sfx/bgm/equipments.mp3', //equipments
    '/sfx/bgm/dungeons.mp3', //dungeons
    '/sfx/bgm/battle.mp3', //battleReplay
    '/sfx/bgm/arena.mp3', //arena
  ]

  let bgmPlaybackInstance
  var appBGM = new Howl({
    src: [musicTrack[trackSelected]],
    autoplay: false,
    loop: true,
    volume: 0.25,
    html5: true,
    mute: isMutedSound
  });

  React.useEffect(() => {
    if (address) {
      bgmPlaybackInstance = appBGM.play()
      return () => {
        if (bgmPlaybackInstance) {
          appBGM.stop(bgmPlaybackInstance)
        }
      }
    }
  }, [])

  React.useEffect(()=> {
    Howler.stop()
    bgmPlaybackInstance = appBGM.play()
  },[trackSelected])

  const stopMusic = () => {
    Howler.stop()
    setIsMusicStopped(true)
    setIsMutedSound(true)
  }

  const playMusic = () => {
    appBGM.play(bgmPlaybackInstance)
    setIsMusicStopped(false)
    setIsMutedSound(false)
  }

  const muteAllSound = () => {
    Howler.mute()
    setIsMutedSound(true)
  }

  const unmuteAllSound = () => {
    Howler.volume(0.25)
  }

  React.useEffect(() => {
    if (localStorage.getItem(`characterSelected-${address}`)) {
      setCharacterSelected(localStorage.getItem(`characterSelected-${address}`))
    }
    if (localStorage.getItem(`characterIcon-${address}`)) {
      setCharacterIcon(localStorage.getItem(`characterIcon-${address}`))
    }
    if (!address) {
      setCharacterSelected(undefined)
      setCharacterIcon(undefined)
    }
  }, [, address])

  return (
    <WagmiConfig client={client}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <TopBar
            characterSelected={characterSelected}
            characterIcon={characterIcon}
            playMusic={playMusic}
            stopMusic={stopMusic}
            isMusicStopped={isMusicStopped}
            isMutedSound={isMutedSound}
            muteAllSound={muteAllSound}
            unmuteAllSound={unmuteAllSound}
            setTrackSelected={setTrackSelected}
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
            dungeonSelected={dungeonSelected}
            setDungeonSelected={setDungeonSelected}
            setTrackSelected={setTrackSelected}
          />
          <BottomBar
            setTrackSelected={setTrackSelected}
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