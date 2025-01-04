'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { NetworkSelectorModal } from './network-selector-modal'
import type { Chain } from '@web3-onboard/common'

interface NetworkSelectorProps {
  selectedNetwork: Chain
  onNetworkChange: (network: Chain) => void
  networks: Chain[]
  label?: string
}

export function NetworkSelector({
  selectedNetwork,
  onNetworkChange,
  networks,
  label = "To (Destination Network)"
}: NetworkSelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={isModalOpen}
        aria-label="Select destination network"
        className="w-full justify-between bg-card border border-border hover:bg-accent hover:text-accent-foreground dark:bg-background dark:border-border dark:hover:bg-accent dark:text-foreground"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-muted">
            <Image
              src={selectedNetwork.icon || '/placeholder.svg?height=24&width=24'}
              alt={selectedNetwork.label}
              width={24}
              height={24}
            />
          </div>
          <span className="font-medium">{selectedNetwork.label}</span>
        </div>
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground dark:text-muted-foreground" />
      </Button>

      <NetworkSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(network) => {
          onNetworkChange(network)
          setIsModalOpen(false)
        }}
        selectedNetwork={selectedNetwork}
        networks={networks}
      />
    </div>
  )
}

