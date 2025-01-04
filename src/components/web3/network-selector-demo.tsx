'use client'

import { useState } from 'react'
import { NetworkSelectorModal } from '../components/network-selector-modal'
import { Button } from "@/components/ui/button"
import type { Chain } from '@web3-onboard/common'

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

export default function NetworkSelectorDemo() {
  const [selectedNetwork, setSelectedNetwork] = useState<Chain>(mockNetworks[0])
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="p-4">
      <Button onClick={() => setIsModalOpen(true)}>
        Select Network
      </Button>

      <NetworkSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(network) => {
          setSelectedNetwork(network)
          setIsModalOpen(false)
        }}
        selectedNetwork={selectedNetwork}
        networks={mockNetworks}
      />
    </div>
  )
}

