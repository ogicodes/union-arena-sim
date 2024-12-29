import type { CardType, CardColor } from '../../types'
import { generateId } from '../../utils/generate-id'

/**
 * Card
 *
 * The playing card of the game.
 * */
export class Card {
  private _name: string
  private _effectData: string
  private _cardType: CardType
  private _triggerData: string | null
  private _uniqueId: string
  private _isFaceUp: boolean
  private _isRested: boolean
  private _needEnergyData: number
  private _apCost: number
  private _color: CardColor
  private _bpData: number | null
  private _generatedEnergyData: number

  constructor(
    name: string,
    effectData: string,
    cardType: CardType,
    triggerData: string | null,
    apCost: number,
    color: CardColor,
    bpData: number | null,
    needEnergyData: number,
    generatedEnergyData: number,
  ) {
    this._name = name
    this._effectData = effectData
    this._cardType = cardType
    this._uniqueId = generateId()
    this._isFaceUp = false
    this._isRested = true
    this._triggerData = triggerData
    this._generatedEnergyData = generatedEnergyData
    this._apCost = apCost
    this._color = color
    this._bpData = bpData
    this._needEnergyData = needEnergyData
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
   * get data
   *
   * A single getter for all card information.
   * */
  get data(): {
    name: string
    id: string
    cardType: CardType
    color: CardColor
    bpData: number | null
    state: { isFaceUp: boolean; isRested: boolean }
    abilities: {
      effectData: string
      triggerData: string | null
    }
    costs: {
      apCost: number
      needEnergyData: number
      generatedEnergyData: number
    }
  } {
    return {
      name: this._name,
      id: this._uniqueId,
      cardType: this._cardType,
      color: this._color,
      bpData: this._bpData,
      state: {
        isFaceUp: this._isFaceUp,
        isRested: this._isRested,
      },
      abilities: {
        effectData: this._effectData,
        triggerData: this._triggerData,
      },
      costs: {
        apCost: this._apCost,
        needEnergyData: this._needEnergyData,
        generatedEnergyData: this._generatedEnergyData,
      },
    }
  }
}
