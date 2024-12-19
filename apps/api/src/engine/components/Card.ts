import type {
  CardType,
  Trigger,
  TriggerEffect,
  Keyword,
  KeywordAbility,
  ActivationTimingAbility,
  ActivationCondition,
  BpData,
  CardColor,
  GeneratedEnergyData,
  AttributeData,
} from '../../types'
import { generateId } from '../../utils/generate-id'

// TODO:
// CHORES
//
// Create a standard getter/output of the card object to use

/**
 * Card
 *
 * The playing card of the game.
 * */
export class Card {
  private _name: string
  private _effectData: string
  private _cardType: CardType
  private _uniqueId: string
  private _isFaceUp: boolean
  private _isRested: boolean
  private _trigger: Trigger
  private _triggerEffect: TriggerEffect
  private _keyword: Keyword
  private _keywordAbility: KeywordAbility
  private _activationTimingAbility: ActivationTimingAbility[]
  private _activationCondition: ActivationCondition
  private _needEnergyData: number
  private _apCost: number
  private _isRaidable: boolean
  private _color: CardColor
  private _bpData: BpData
  private _attributeData: AttributeData
  private _generatedEnergyData: GeneratedEnergyData

  constructor(
    name: string,
    effectData: string,
    cardType: CardType,
    trigger: Trigger,
    triggerEffect: TriggerEffect,
    keyword: Keyword,
    keywordAbility: KeywordAbility,
    activationTimingAbility: ActivationTimingAbility[],
    activationCondition: ActivationCondition,
    apCost: number,
    isRaidable: boolean,
    color: CardColor,
    bpData: BpData,
    attributeData: AttributeData,
    needEnergyData: number,
    generatedEnergyData: GeneratedEnergyData,
  ) {
    this._name = name
    this._effectData = effectData
    this._cardType = cardType
    this._uniqueId = generateId()
    this._isFaceUp = false
    this._isRested = true
    this._trigger = trigger
    this._triggerEffect = triggerEffect
    this._keyword = keyword
    this._keywordAbility = keywordAbility
    this._activationTimingAbility = activationTimingAbility
    this._activationCondition = activationCondition
    this._generatedEnergyData = generatedEnergyData
    this._apCost = apCost
    this._isRaidable = isRaidable
    this._color = color
    this._bpData = bpData
    this._attributeData = attributeData
    this._needEnergyData = needEnergyData
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
    isRaidable: boolean
    bpData: BpData
    attributeData: AttributeData
    state: { isFaceUp: boolean; isRested: boolean }
    abilities: {
      effectData: string
      trigger: Trigger
      triggerEffect: TriggerEffect
      keyword: Keyword
      keywordAbility: KeywordAbility
      activationTimingAbility: ActivationTimingAbility[]
      activationCondition: ActivationCondition
    }
    costs: {
      apCost: number
      needEnergyData: number
      generatedEnergyData: GeneratedEnergyData
    }
  } {
    return {
      name: this._name,
      id: this._uniqueId,
      cardType: this._cardType,
      color: this._color,
      isRaidable: this._isRaidable,
      bpData: this._bpData,
      attributeData: this._attributeData,
      state: {
        isFaceUp: this._isFaceUp,
        isRested: this._isRested,
      },
      abilities: {
        effectData: this._effectData,
        trigger: this._trigger,
        triggerEffect: this._triggerEffect,
        keyword: this._keyword,
        keywordAbility: this._keywordAbility,
        activationTimingAbility: this._activationTimingAbility,
        activationCondition: this._activationCondition,
      },
      costs: {
        apCost: this._apCost,
        needEnergyData: this._needEnergyData,
        generatedEnergyData: this._generatedEnergyData,
      },
    }
  }
}
