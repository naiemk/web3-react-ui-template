'use client'

import { useState } from 'react'
import { TokenEditor } from '@/components/web3/token-editor'
import { TokenSelectorModal } from '@/components/web3/token-selector-modal'
import { NetworkSelector } from '@/components/web3/network-selector'
import { UnclaimedBalanceModal } from './unclaimed-balance-modal'
import { GLOBAL_CONFIG } from '@/types/token'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { ChainLabel } from '@/components/web3/chain-label'
import { useConnectWalletSimple, getChain, ChainConstants, Token, ApprovableButton } from 'web3-react-ui'
import { NetworkSelectorModal } from '@/components/web3/network-selector-modal'
import { TokenBalance } from '@/components/web3/token-balance'

interface AppConfig {
  bridgeContracts: {
    [chainId: string]: string
  }
}

export function TokenEditorSection() {
  const [amount, setAmount] = useState('')
  const { address, chainId} = useConnectWalletSimple();

  // We separate modal from selector, because we want to use the same modal for multiple selectors
  // Token selector
  const [isTokenSelectorOpen, setIsTokenSelectorOpen] = useState(false)
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [onTokenSelect, setOnTokenSelect] = useState<any>({})
  // Network selector
  const [isNetworkSelectorOpen, setIsNetowrkSelectorOpen] = useState(false)
  const [selectedNetworkId, setSelectedNetworkId] = useState<string>('');
  const [onNetworkSelect, setOnNetworkSelect] = useState<any>({})

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isUnclaimedBalanceModalOpen, setIsUnclaimedBalanceModalOpen] = useState(false)
  const chainIds = Object.keys(ChainConstants);
  const tokens = GLOBAL_CONFIG['TOKENS'] as Token[] || []; // This comes from the config file passed in layout...
  const appConfig = GLOBAL_CONFIG['APP'] as AppConfig || {};
  const bridgeContractAddress = appConfig?.bridgeContracts?.[chainId || '-'] || null;

  const handleNetowrkSelect = (networkId: string) => {
    onNetworkSelect.selector && onNetworkSelect.selector(networkId)
    setIsNetowrkSelectorOpen(false)
  }

  const handleTokenSelect = (token: Token) => {
    onTokenSelect.selector && onTokenSelect.selector(token)
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
          You have some unclaimed balance on the {getChain(chainId || '1')?.label}.{' '}
          <button
            onClick={() => setIsUnclaimedBalanceModalOpen(true)}
            className="font-medium underline underline-offset-4"
          >
            See more
          </button>
        </AlertDescription>
      </Alert>

      <div className="bg-card/50 dark:bg-card/10 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border space-y-4">
        <ChainLabel chainId={chainId!} label={`Connected to ${getChain(chainId!)?.label}`} />

        <NetworkSelector
          selectedNetworkId={selectedNetworkId}
          label="To (Destination Network)"
          onOpenModal={() => {
            const selector = (netId: string) => { setSelectedNetworkId(netId); setSelectedToken(null)}
            console.log('selector', selector)
            setOnNetworkSelect({selector});
            setIsNetowrkSelectorOpen(true)
          }}
        />
        
        <div className="space-y-2">
          <TokenEditor
            value={amount}
            onChange={setAmount}
            onTokenSelect={() => {
              setOnTokenSelect({selector: (token: Token) => setSelectedToken(token)});
              setIsTokenSelectorOpen(true)
            }}
            selectedToken={selectedToken}
            disabled={!selectedNetworkId}
          />
          {selectedToken && <TokenBalance token={selectedToken} userAddress={address!}/>}
        </div>

       {errorMessage && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )} 
        {/* Swap Button */}
        <ApprovableButton
          chainId={chainId!}
          token={selectedToken?.address || ''}
          amount={amount}
          spender={bridgeContractAddress!}
          approveButton={(onApprove, pending) => (<Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={onApprove}
                  disabled={pending}
                >
                  Swap {pending ? '...' : ''}
                </Button>)}
          actionButton={
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleSwap}
                >
                  Swap
                </Button>}
          unknownState={ <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={true}
                >
                  Swap
                </Button>}
        />
      </div>

      <TokenSelectorModal
        isOpen={isTokenSelectorOpen}
        onClose={() => setIsTokenSelectorOpen(false)}
        onSelect={handleTokenSelect}
        selectedToken={selectedToken}
        tokens={tokens.filter(token => token.chainId == selectedNetworkId)}
      />

      <NetworkSelectorModal
        isOpen={isNetworkSelectorOpen}
        onClose={() => setIsNetowrkSelectorOpen(false)}
        onSelect={handleNetowrkSelect}
        networkIds={(chainIds || []).filter(id => id !== selectedNetworkId)}
      />

      <UnclaimedBalanceModal
        isOpen={isUnclaimedBalanceModalOpen}
        onClose={() => setIsUnclaimedBalanceModalOpen(false)}
        chainId={chainId!}
        unclaimedBalance={{
          amount: '200',
          token: 'USDT'
        }}
        onClaim={handleClaim}
      />
    </div>
  )
}

