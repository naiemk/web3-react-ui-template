'use client'

import { useState, useEffect } from 'react'
import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import { Button } from "@/components/ui/button"
import { WalletModal } from './wallet-modal'
import { shortenAddress } from '@/utils/web3'

const injected = injectedModule()

function initWeb3Onboard() {
  init({
    wallets: [injected],
    chains: [
      {
        id: '0x38',
        token: 'BNB',
        label: 'BNB Smart Chain',
        rpcUrl: 'https://bsc-dataseed.binance.org'
      }
    ],
    appMetadata: {
      name: 'Web3 Connect',
      icon: '<svg>...</svg>', // Your app icon as an SVG string
      description: 'Web3 Connection Manager'
    },
    connect: {
      autoConnectLastWallet: true
    },
    accountCenter: {
      desktop: {
        enabled: false
      },
      mobile: {
        enabled: false
      }
    }
  })
}

function Web3Connect() {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    initWeb3Onboard()
    setInitialized(true)
  }, [])

  if (!initialized) {
    return <Button disabled>Initializing...</Button>
  }

  return <ConnectWalletButton />
}

function ConnectWalletButton() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const mockBalances = {
    bnb: '0.027503',
    cake: '0'
  }

  const handleConnect = async () => {
    if (wallet) {
      setIsModalOpen(true)
    } else {
      await connect()
    }
  }

  const handleDisconnect = async () => {
    setIsModalOpen(false)
    await disconnect(wallet)
  }

  return (
    <>
      <Button
        onClick={handleConnect}
        disabled={connecting}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {connecting ? (
          'Connecting...'
        ) : wallet ? (
          shortenAddress(wallet.accounts[0].address)
        ) : (
          'Connect'
        )}
      </Button>

      {wallet && (
        <WalletModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          address={wallet.accounts[0].address}
          chainId={parseInt(wallet.chains[0].id, 16)}
          balance={mockBalances}
          onDisconnect={handleDisconnect}
        />
      )}
    </>
  )
}

export default Web3Connect

