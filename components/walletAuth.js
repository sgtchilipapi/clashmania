import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
 
export default function WalletAuth() {
  const { address, isConnected } = useAccount({
    onConnect({address}) {
      localStorage.setItem('wallet', address)
    },
  })
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
 
  if (isConnected)
    return (
      <div>
        <button onClick={() => disconnect()}>{`${address.slice(0,4)}...${address.slice(address.length - 4)}`}</button>
      </div>
    )
  return <button onClick={() => connect()}>Connect Wallet</button>
}