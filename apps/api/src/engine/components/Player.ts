import type { Card, ActionPointCard } from '../../types/index'
import { generateId } from '../../utils/generate-id'

/**
 * Player
 *
 * The player object that holds data relevant to each player.
 * Player can only be mutated through the GameState, which in turn
 * can only be mutated through the TurnManger.
 * */
export class Player {
  private _id: string
  private _name: string
  private _deck: Card[]
  private _hand: Card[]
  private _actionPoints: ActionPointCard[]
  private _turnCount: number

  constructor(
    name: string,
    deck: Card[],
    actionPoints: ActionPointCard[],
  ) {
    this._id = generateId()
    this._name = name
    this._deck = this.shuffleDeck(deck)
    this._hand = []
    this._turnCount = 1
    this._actionPoints = actionPoints
  }

  /**
   * get id
   *
   * Read-only access to the player id.
   *
   * @returns string
   * */
  get id(): string {
    return this._id
  }

  /**
   * get hand
   *
   * Read-only access to the player hand.
   *
   * @returns cards Card[]
   * */
  get hand(): Card[] {
    return this._hand
  }

  /**
   * get deck
   *
   * Read-only access to the player deck.
   *
   * @returns cards Card[]
   * */
  get deck(): Card[] {
    return this._deck
  }

  /**
   * get actionPoints
   *
   * Read-only access to the players AP cards.
   *
   * @returns APCards ActionPointCard[]
   * */
  get actionPoints(): ActionPointCard[] {
    return this._actionPoints
  }

  /**
   * get turnCount
   *
   * Read-only access to the players turnCount
   *
   * @returns number
   * */
  get turnCount(): number {
    return this._turnCount
  }

  /**
   * get name
   *
   * Read-only access to the player name.
   *
   * @returns string
   * */
  get name(): string {
    return this._name
  }

  /**
   * private shuffleDeck
   *
   * Shuffles the deck to assemble a random deck.
   *
   * @returns Card[]
   * */
  private shuffleDeck(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[deck[i], deck[j]] = [deck[j], deck[i]]
    }
    return deck
  }

  /**
   * public setHand
   *
   * Sets the players hand with an array of cards and returns the hand.
   *
   * @param cards Card[]
   * @returns hand Card[]
   * */
  public setHand(cards: Card[]): Card[] {
    cards.forEach(card => this._hand.push(card))
    return this._hand
  }

  /**
   * public resetHand
   *
   * Resets the players hand to an empty array of cards.
   *
   * @returns void
   * */
  public resetHand(): void {
    this._hand.length = 0
  }

  /**
   * public pluck
   *
   * Removes a single card from the players hand, and returns it.
   *
   * @param cardIdx number
   * @returns Card | null
   * */
  public pluck(cardIdx: number): Card | null {
    return this._hand.splice(cardIdx, 1)[0] ?? null
  }

  /**
   * public drawCard
   *
   * Draws a card from the deck to the players hand.
   *
   * @returns Card | null
   * */
  public drawCard(): Card | null {
    if (this._deck.length === 0) {
      console.log(`no cards left`)
      return null
    }
    const card = this._deck.shift()
    return card || null
  }

  /**
   * public addToHand
   *
   * Adds a card to the players hand.
   *
   * @returns void
   * */
  public addToHand(card: Card): void {
    this._hand.push(card)
  }

  /**
   * drawActionPointCard
   *
   * Pops and returns an action point card
   *
   * @returns ActionPointCard
   * */
  public drawActionPointCard(): ActionPointCard {
    const card = this._actionPoints.pop()
    if (!card) {
      throw new Error('No AP card available.')
    }
    return card
  }
}
