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

  private shuffleDeck(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[deck[i], deck[j]] = [deck[j], deck[i]]
    }
    return deck
  }

  public drawCard(): Card | null {
    if (this._deck.length === 0) {
      console.log(`no cards left`)
      return null
    }
    const card = this._deck.shift()
    return card || null
  }

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
    // Remove and return the card from the actionPoints array
    const card = this._actionPoints.pop()
    if (!card) {
      throw new Error('No AP card available.')
    }
    return card
  }
}
