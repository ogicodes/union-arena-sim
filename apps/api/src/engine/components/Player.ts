import type { Card, ActionPointCard } from '../../types/index'
import { generateId } from '../../utils/generate-id'

export class Player {
  public id: string
  public name: string
  public deck: Card[]
  public hand: Card[]
  public actionPoints: ActionPointCard[]
  public mulligan: boolean
  public turnCount: number
  public payApToDraw: boolean

  constructor(
    name: string,
    deck: Card[],
    actionPoints: ActionPointCard[],
  ) {
    this.id = generateId()
    this.name = name
    this.deck = this.shuffleDeck(deck)
    this.hand = []
    this.mulligan = false
    this.turnCount = 1
    this.payApToDraw = false
    this.actionPoints = actionPoints
  }

  private shuffleDeck(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[deck[i], deck[j]] = [deck[j], deck[i]]
    }
    return deck
  }

  drawCard(): Card | null {
    if (this.deck.length === 0) {
      console.log(`no cards left`)
      return null
    }
    const card = this.deck.shift()
    return card || null
  }

  addToHand(card: Card): void {
    this.hand.push(card)
  }

  /**
   * drawActionPointCard
   *
   * Pops and returns an action point card
   *
   * @returns ActionPointCard
   * */
  drawActionPointCard(): ActionPointCard {
    // Remove and return the card from the actionPoints array
    const card = this.actionPoints.pop()
    if (!card) {
      throw new Error('No AP card available.')
    }
    return card
  }

  playCard(cardIndex: number): Card | null {
    if (cardIndex < 0 || cardIndex >= this.hand.length) {
      console.log(`invalid`)
      return null
    }
    const [card] = this.hand.splice(cardIndex, 1)
    console.log(`played a card`)
    return card
  }

  hasLost(): boolean {
    console.log(`You have lost. Goodbye.`)
    return true
  }

  getHand(): Card[] {
    return this.hand
  }
}
