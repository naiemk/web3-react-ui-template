'use client'

import { useState } from 'react'
import { TokenEditor } from './token-editor'
import { TokenSelectorModal } from './token-selector-modal'
import { NetworkSelector } from './network-selector'
import { UnclaimedBalanceModal } from './unclaimed-balance-modal'
import { Token } from '../types/token'
import type { Chain } from '@web3-onboard/common'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

// Mock tokens data
const mockTokens: Token[] = [
  {
    symbol: 'BNB',
    name: 'BNB Smart Chain',
    icon: '/placeholder.svg?height=32&width=32',
    decimals: 18,
    balance: '0.027503'
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    icon: '/placeholder.svg?height=32&width=32',
    decimals: 18,
    address: '0x55d398326f99059ff775485246999027b3197955',
    balance: '0.00'
  },
  {
    symbol: 'CAKE',
    name: 'PancakeSwap Token',
    icon: '/placeholder.svg?height=32&width=32',
    decimals: 18,
    address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    balance: '0.00'
  },
  {
    symbol: 'BTCB',
    name: 'Bitcoin BEP2',
    icon: '/placeholder.svg?height=32&width=32',
    decimals: 18,
    address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    balance: '0.00'
  }
]

// Mock networks data
const mockNetworks: Chain[] = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum',
    rpcUrl: '',
    icon: '/placeholder.svg?height=32&width=32'
  },
  {
    id: '0x38',
    token: 'BNB',
    label: 'BNB Smart Chain',
    rpcUrl: '',
    icon: '/placeholder.svg?height=32&width=32'
  },
  {
    id: '0x144',
    token: 'ETH',
    label: 'zkSync',
    rpcUrl: '',
    icon: '/placeholder.svg?height=32&width=32'
  },
  {
    id: '0xa4b1',
    token: 'ETH',
    label: 'Arbitrum One',
    rpcUrl: '',
    icon: '/placeholder.svg?height=32&width=32'
  },
  {
    id: '0xe708',
    token: 'ETH',
    label: 'Linea',
    rpcUrl: '',
    icon: '/placeholder.svg?height=32&width=32'
  },
  {
    id: '0x2105',
    token: 'ETH',
    label: 'Base',
    rpcUrl: '',
    icon: '/placeholder.svg?height=32&width=32'
  },
  {
    id: '0x15eb',
    token: 'BNB',
    label: 'opBNB',
    rpcUrl: '',
    icon: '/placeholder.svg?height=32&width=32'
  },
  {
    id: '0x44d',
    token: 'MATIC',
    label: 'Polygon zkEVM',
    rpcUrl: '',
    icon: '/placeholder.svg?height=32&width=32'
  }
]

export function TokenEditorSection() {
  const [amount, setAmount] = useState('')
  const [selectedToken, setSelectedToken] = useState(mockTokens[0])
  const [isTokenSelectorOpen, setIsTokenSelectorOpen] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState<Chain>(mockNetworks[0])
  const [isUnclaimedBalanceModalOpen, setIsUnclaimedBalanceModalOpen] = useState(false)
  const connectedNetwork = mockNetworks[3] // Arbitrum for this example

  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token)
    setIsTokenSelectorOpen(false)
  }

  const handleSwap = () => {
    // TODO: Implement swap functionality
    console.log('Swap button clicked')
  }

  const handleClaim = () => {
    // TODO: Implement claim functionality
    console.log('Claim button clicked')
    setIsUnclaimedBalanceModalOpen(false)
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          You have some unclaimed balance on the {connectedNetwork.label}.{' '}
          <button
            onClick={() => setIsUnclaimedBalanceModalOpen(true)}
            className="font-medium underline underline-offset-4"
          >
            See more
          </button>
        </AlertDescription>
      </Alert>

      <div className="bg-card/50 dark:bg-card/10 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border space-y-4">
        {/* Connected Network Section */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-background">
              <Image
                src={connectedNetwork.icon}
                alt={connectedNetwork.label}
                width={24}
                height={24}
              />
            </div>
            <span className="font-medium text-sm text-foreground">Connected to {connectedNetwork.label}</span>
          </div>
        </div>

        <NetworkSelector
          selectedNetwork={selectedNetwork}
          onNetworkChange={setSelectedNetwork}
          networks={mockNetworks}
          label="To (Destination Network)"
        />
        
        <div className="space-y-2">
          <TokenEditor
            value={amount}
            onChange={setAmount}
            onTokenSelect={() => setIsTokenSelectorOpen(true)}
            selectedToken={selectedToken}
          />
          <div className="text-sm text-muted-foreground px-2">
            Balance: {selectedToken.balance} {selectedToken.symbol}
          </div>
        </div>

        {/* Swap Button */}
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={handleSwap}
        >
          Swap
        </Button>
      </div>

      <TokenSelectorModal
        isOpen={isTokenSelectorOpen}
        onClose={() => setIsTokenSelectorOpen(false)}
        onSelect={handleTokenSelect}
        selectedToken={selectedToken}
        tokens={mockTokens}
      />

      <UnclaimedBalanceModal
        isOpen={isUnclaimedBalanceModalOpen}
        onClose={() => setIsUnclaimedBalanceModalOpen(false)}
        connectedNetwork={connectedNetwork.label}
        unclaimedBalance={{
          amount: '200',
          token: 'USDT'
        }}
        onClaim={handleClaim}
      />
    </div>
  )
}

