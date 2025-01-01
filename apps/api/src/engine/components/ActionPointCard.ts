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
   * get data
   *
   * A single getter for all card information.
   * */
  get data(): {
    name: string
    id: string
    state: {
      isFaceUp: boolean
      isRested: boolean
    }
  } {
    return {
      name: this._name,
      id: this._id,
      state: {
        isFaceUp: this._isFaceUp,
        isRested: this._isRested,
      },
    }
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
   * restCard
   *
   * Takes the current card and rests it.
   *
   * @returns boolean
   */
  public rest(): boolean {
    this._isRested = !this._isRested
    return this._isRested
  }
}
