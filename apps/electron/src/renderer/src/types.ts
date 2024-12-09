export interface CardData {
  id: string
  name: string
  imagePath: string
  cardInfo: any
}

export interface ElectronAPI {
  loadCards: () => Promise<CardData[]>
  saveDeck: (deckData: {
    deckName: string
    deckImages: string[]
    apDeckImages: string[]
  }) => Promise<{ success: boolean }>
  loadDecks: () => Promise<Array<{ name: string; mainDeck: string[]; apDeck: string[] }>>
  deleteDeck: (deckName: string) => Promise<{ success: boolean }>
}

declare global {
  interface Window {
    electron: ElectronAPI
  }
}
