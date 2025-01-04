'use client'

import { Button } from "@/components/ui/button"
import { Copy, ExternalLink, Plus, X } from 'lucide-react'
import Image from 'next/image'
import { Token, TokenSelectorModalProps } from '@/types/token'
import { copyToClipboard, getExplorerUrl } from '@/utils/web3'
import { useToast } from "@/hooks/use-toast"
import { ListSelectorModal } from './list-selector-modal'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TokenSelectorModal({
  isOpen,
  onClose,
  onSelect,
  selectedToken,
  tokens
}: TokenSelectorModalProps) {
  const { toast } = useToast()

  const handleCopyAddress = async (address: string) => {
    const success = await copyToClipboard(address)
    if (success) {
      toast({
        title: "Address Copied",
        description: "The token address has been copied to your clipboard.",
        duration: 3000,
      })
    }
  }

  const handleAddToMetamask = async (token: Token) => {
    try {
      if (!window.ethereum || !token.address) return

      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: token.address,
            symbol: token.symbol,
            decimals: token.decimals,
            image: token.icon,
          },
        },
      })

      toast({
        title: "Token Added",
        description: `${token.symbol} has been added to MetaMask.`,
        duration: 3000,
      })
    } catch (error) {
      console.error('Error adding token to MetaMask:', error)
    }
  }

  const openExplorer = (address: string) => {
    window.open(`https://bscscan.com/token/${address}`, '_blank')
  }

  const titleBar = (
    <>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-yellow-400">
          <Image
            src={selectedToken.icon}
            alt={selectedToken.name}
            width={32}
            height={32}
          />
        </div>
        <span className="text-lg font-semibold">{selectedToken.symbol}</span>
        {selectedToken.address && (
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => handleCopyAddress(selectedToken.address!)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy Address</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => openExplorer(selectedToken.address!)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View on Explorer</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => handleAddToMetamask(selectedToken)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to MetaMask</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </>
  )

  const itemRenderer = (token: Token) => (
    <>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-yellow-400">
          <Image
            src={token.icon}
            alt={token.symbol}
            width={32}
            height={32}
          />
        </div>
        <div className="text-left">
          <div className="font-medium">{token.symbol}</div>
          <div className="text-sm text-muted-foreground">{token.name}</div>
        </div>
      </div>
      <div className="text-right text-sm text-muted-foreground">
        {token.balance || '0'}
      </div>
    </>
  )

  const commonItems = tokens.slice(0, 3).map(token => ({
    item: token,
    name: token.symbol,
    logo: token.icon
  }))

  return (
    <ListSelectorModal
      isOpen={isOpen}
      onClose={onClose}
      onSelect={onSelect}
      items={tokens}
      itemRenderer={itemRenderer}
      commonItems={commonItems}
      displayCommonItems={true}
      titleBar={titleBar}
      searchPlaceholder="Search by name or paste address"
    />
  )
}

