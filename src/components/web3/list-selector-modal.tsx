'use client'

import { useState, useEffect, useMemo } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from 'next/image'

interface CommonItem {
  item: any
  name: string
  logo: string
}

interface ListSelectorModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (item: any) => void
  items: any[]
  itemRenderer: (item: any) => React.ReactNode
  commonItems?: CommonItem[]
  displayCommonItems?: boolean
  title: string // Added title prop
  titleBar: React.ReactNode
  searchPlaceholder?: string
}

export function ListSelectorModal({
  isOpen,
  onClose,
  onSelect,
  items,
  itemRenderer,
  commonItems = [],
  displayCommonItems = true,
  title, // Using title prop
  titleBar,
  searchPlaceholder = "Search"
}: ListSelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items
    const lowerQuery = searchQuery.toLowerCase()
    return items.filter(item => 
      JSON.stringify(item).toLowerCase().includes(lowerQuery)
    )
  }, [items, searchQuery])

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className={`
        p-0 bg-background text-foreground
        ${isMobile 
          ? 'w-full h-full max-h-full rounded-none' 
          : 'sm:max-w-[420px] h-[600px] max-h-[80vh] rounded-lg'
        }
      `}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Title Bar */}
          <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-border">
              {titleBar}
          </div>

          {/* Search */}
          <div className="flex-shrink-0 p-4 pb-2">
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-muted border-primary/20 focus-visible:ring-primary/20"
            />
          </div>

          {/* Common Items */}
          {displayCommonItems && commonItems.length > 0 && (
            <div className="flex-shrink-0 px-4 pb-2">
              <div className="text-sm font-medium mb-2">Common selections</div>
              <div className={`flex gap-2 ${isMobile ? 'flex-wrap' : 'overflow-x-auto pb-2'}`}>
                {commonItems.map((commonItem, index) => (
                  <Button
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-2"
                    onClick={() => onSelect(commonItem.item)}
                  >
                    <div className="w-5 h-5 rounded-full overflow-hidden bg-muted">
                      <img
                        src={commonItem.logo}
                        alt={commonItem.name}
                        width={20}
                        height={20}
                      />
                    </div>
                    <span>{commonItem.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Item List */}
          <ScrollArea className="flex-grow overflow-y-auto">
            <div className="px-2 py-2">
              {filteredItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors"
                  onClick={() => onSelect(item)}
                >
                  {itemRenderer(item)}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

