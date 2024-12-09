import type { CardData } from '../types'

const loadAllCards = async (): Promise<CardData[]> => {
  try {
    if (!window.electron?.loadCards) {
      throw new Error('Electron API is not available')
    }
    const cards = await window.electron.loadCards()
    return cards
  } catch (error) {
    console.error('Error loading cards:', error)
    throw error
  }
}

export default loadAllCards
