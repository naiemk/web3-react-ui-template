export interface Token {
  symbol: string
  name: string
  icon: string
  decimals: number
  address?: string
  balance?: string
}

export interface TokenEditorProps {
  value: string
  onChange: (value: string) => void
  onTokenSelect: () => void
  selectedToken: Token
  disabled?: boolean
}

export interface TokenSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (token: Token) => void
  selectedToken: Token
  tokens: Token[]
}

