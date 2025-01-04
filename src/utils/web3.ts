export const shortenAddress = (address: string, chars = 4) => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy:', error)
    return false
  }
}

export const getExplorerUrl = (address: string, chainId: number) => {
  // Add more networks as needed
  const explorers: Record<number, string> = {
    56: 'https://bscscan.com/address/', // BSC
    1: 'https://etherscan.io/address/', // Ethereum
  }
  return `${explorers[chainId] || explorers[56]}${address}`
}

