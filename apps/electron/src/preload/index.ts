import { contextBridge, ipcRenderer } from 'electron'
import type { CardData } from '../renderer/src/types'

console.log('Preload script starting...')

const electronHandler = {
  loadCards: () => ipcRenderer.invoke('load-cards'),
  saveDeck: (deckData: { deckName: string; deckImages: string[]; apDeckImages: string[] }) =>
    ipcRenderer.invoke('save-deck', deckData),
  loadDecks: () => ipcRenderer.invoke('load-decks'),
  deleteDeck: (deckName: string) => ipcRenderer.invoke('delete-deck', deckName)
}

contextBridge.exposeInMainWorld('electron', electronHandler)

declare global {
  interface Window {
    electron: {
      loadCards: () => Promise<CardData[]>
      saveDeck: (deckData: {
        deckName: string
        deckImages: string[]
        apDeckImages: string[]
      }) => Promise<{ success: boolean }>
      loadDecks: () => Promise<Array<{ name: string; mainDeck: string[]; apDeck: string[] }>>
      deleteDeck: (deckName: string) => Promise<{ success: boolean }>
    }
  }
}
