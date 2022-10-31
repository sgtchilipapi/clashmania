import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import React from 'react'
import * as apis from "../random-clash-contracts/api/contracts/contracts-api"

export default function Home() {

  async function getCharacterProps(){
    console.log(await apis.core.equipments.transfer("0x6b4787A1A2aE3C31aeA3b24C36cFcFb390D946B6", "0x6b4787A1A2aE3C31aeA3b24C36cFcFb390D946B6", 1))
    // console.log(await apis.core.equipments.getEquipmentStats(1))
    // console.log(await apis.core.equipments.getEquipmentProperties(1))
  }

  return (
    <div>
      <Head>
        <title >Random Clash App</title>
        <meta name="description" content="A complete on-chain Role-Playing-Game with character progression, item & equipment crafting, integral Defi economy and a breath-taking battle system." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <button onClick={getCharacterProps}>Check RPC</button>
        </div>
      </main>
      <footer>
        
      </footer>
    </div>
  )
}
