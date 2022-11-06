import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import { ethers } from 'hardhat'

import React from 'react'
import * as apis from "../random-clash-contracts/api/contracts/contracts-api"

export default function Home() {

  return (
    <div>
      <Head>
        <title >Random Clash App</title>
        <meta name="description" content="A complete on-chain Role-Playing-Game with character progression, item & equipment crafting, integral Defi economy and a breath-taking battle system." />
        <link rel="icon" href="/rc-icon.ico" />
      </Head>
      <main>
        {/* Home Image */}
        {/* Welcome, Clasher! */}
        {/* Get Started Button */}
      </main>
    </div>
  )
}
