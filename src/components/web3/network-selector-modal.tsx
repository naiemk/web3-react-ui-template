'use client'

import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { ListSelectorModal } from './list-selector-modal'
import type { Chain } from '@web3-onboard/common'

interface NetworkSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (network: Chain) => void
  selectedNetwork: Chain
  networks: Chain[]
}

export function NetworkSelectorModal({
  isOpen,
  onClose,
  onSelect,
  selectedNetwork,
  networks
}: NetworkSelectorModalProps) {
  const titleBar = (
    <>
      <div className="flex items-center gap-3">
        <span className="text-xl font-semibold">Destination Network</span>
      </div>
    </>
  )

  const itemRenderer = (network: Chain) => (
    <>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-muted dark:bg-muted">
          <Image
            src={network.icon || '/placeholder.svg?height=32&width=32'}
            alt={network.label}
            width={32}
            height={32}
          />
        </div>
        <div className="text-left">
          <div className="font-medium dark:text-foreground">{network.label}</div>
          <div className="text-sm text-muted-foreground dark:text-muted-foreground">{network.token}</div>
        </div>
      </div>
    </>
  )

  return (
    <ListSelectorModal
      isOpen={isOpen}
      onClose={onClose}
      onSelect={onSelect}
      items={networks}
      itemRenderer={itemRenderer}
      displayCommonItems={false}
      titleBar={titleBar}
      searchPlaceholder="Search by name, token, or chain ID"
    />
  )
}

