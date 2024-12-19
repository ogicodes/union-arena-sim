import { generateId } from '../../utils/generate-id'

/**
 * ActionPointCard
 *
 * The AP Card
 * */
export class ActionPointCard {
  private _name: string
  private _isFaceUp: boolean
  private _isRested: boolean
  private _id: string

  constructor(name: string) {
    this._name = name
    this._isFaceUp = false
    this._isRested = false
    this._id = generateId()
  }

  /**
   * get id
   *
   * Read-only access to the cards id
   *
   * @returns string
   * */
  get id(): string {
    return this._id
  }

  /**
   * get name
   *
   * Read-only access to the AP Card name
   *
   * @returns string
   * */
  get name(): string {
    return this._name
  }

  /**
   * get isFaceUp
   *
   * Read-only access if the card is face up
   *
   * @returns boolean
   * */
  get isFaceUp(): boolean {
    return this._isFaceUp
  }

  /**
   * get isRested
   *
   * Read-only access if the card is rested
   *
   * @returns boolean
   * */
  get isRested(): boolean {
    return this._isRested
  }

  /**
   * flip
   *
   * Takes the current card and flips it face up.
   *
   * @returns boolean - returns true if the card is face up
   */
  public flip(): boolean {
    this._isFaceUp = !this._isFaceUp
    return this._isFaceUp
  }

  /**
   * activateCard
   *
   * Takes the current card and activates the card.
   *
   * @returns boolean
   */
  public activateCard(): boolean {
    this._isRested = !this._isRested
    return this._isRested
  }

  /**
   * restCard
   *
   * Takes the current card and rests it.
   *
   * @returns boolean
   */
  public restCard(): boolean {
    this._isRested = !this._isRested
    return this._isRested
  }
}
