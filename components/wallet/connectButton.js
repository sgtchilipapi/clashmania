import * as React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { Button } from '@mui/material';

export default function ConnectButton(props) {
    const [walletString, setWalletString] = React.useState('')

    const { address, isConnected } = useAccount({
        onDisconnect() {
            localStorage.setItem('wallet', undefined)
            localStorage.setItem('characterSelected', undefined)
        }
    })

    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect()

    const handleConnectToggle = () => {
        isConnected ? disconnect() : connect()
    }

    React.useEffect(() => {
        if (isConnected) {
            setWalletString(`Connected: ${address.slice(0, 4)}...${address.slice(address.length - 4)}`)

        } else {
            setWalletString(`Connect Wallet`)
        }
    }, [isConnected])

    return (
        <Button
            onClick={handleConnectToggle}
            variant='outlined'>
            {walletString}
        </Button>
    );
}