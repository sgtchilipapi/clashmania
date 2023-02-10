import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import styles from '../styles/Home.module.css'
import { useAccount } from 'wagmi'
import CssBaseline from '@mui/material/CssBaseline';

import { Box, Container, Typography, Button } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import * as apis from "../clashmania-contracts/api/contracts/contracts-api"
import LetsGoCard from '../components/index/letsGoCard'

export default function Home(props) {
  const { address } = useAccount()
  // const toCharacters = () => {Router.push('/characters')}

  return (

    <React.Fragment>
      <CssBaseline />
      <div>
        <Head>
          <title >CLASHMANIA</title>
          <meta name="description" content="A complete on-chain Role-Playing-Game with character progression, item & equipment crafting, integral Defi economy and a breath-taking battle system." />
          {/* <link rel="icon" href="/rc-icon.ico" /> */}
        </Head>
        <main>
          <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', color: 'primary.main' }}>
            <Container fixed justify="center" align="center" maxWidth='xs'>
              <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', color: 'primary.main', pt:2 }}>
                <LetsGoCard 
                  title={'This game is free to play!'}
                  body={`To start or resume your clashing journey, please make sure to connect to the Fantom (FTM) Blockchain and click the button below.`}
                />
              </Box>
            </Container>

          </Box>
        </main>
      </div >
    </React.Fragment >
  )
}
