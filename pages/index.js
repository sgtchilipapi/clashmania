import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import { ethers } from 'hardhat'

import React from 'react'
import * as apis from "../random-clash-contracts/api/contracts/contracts-api"

export default function Home() {

  async function query(){
    //console.log(await apis.core.equipments.transfer("0x6b4787A1A2aE3C31aeA3b24C36cFcFb390D946B6", "0x6b4787A1A2aE3C31aeA3b24C36cFcFb390D946B6", 1))
    // console.log(await apis.core.equipments.getEquipmentStats(1))
    // console.log(await apis.core.equipments.getEquipmentProperties(1))
    // await apis.periphery.eqpt_mngr.unequipAll(1)
    // console.log(`Equipped items: ${await apis.periphery.eqpt_mngr.getCharacterEquipments(1)}`)
    // await apis.periphery.routers.ctr_minter.requestCharacter(0,"gorogo","0.01")
    console.log(await apis.core.tokens.approve("thump","0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506", "9"))
    // console.log(await apis.core.tokens.approve("clank","0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506", "9"))
    // console.log(await apis.periphery.routers.eqpt_minter.getEquipmentRecipe(0))
    // await apis.periphery.routers.eqpt_minter.requestEquipment(1,1,".01")
    // await apis.periphery.routers.ctr_minter.requestCharacter(1, "asaf", ".01")
  }

  async function mint(){
    await apis.periphery.routers.ctr_minter.mintCharacter()
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
          <button onClick={query}>Check RPC</button>
        </div>
        <div>
          <button onClick={mint}>mint</button>
        </div>
      </main>
      <footer>
        
      </footer>
    </div>
  )
}
