import {
  ActivationCondition,
  ActivationTimingAbility,
  AttributeData,
  BpData,
  CardColor,
  CardType,
  GeneratedEnergyData,
  Keyword,
  KeywordAbility,
  Trigger,
  TriggerEffect,
} from '../../src/types/index'

export const mockActionCardData = {
  name: 'mock-action-point-card',
}

export const mockDeckCardData = {
  name: 'mock-card' as string,
  effectData: 'mock-effect-data' as string,
  cardType: 'character' as CardType,
  trigger: 'None' as Trigger,
  triggerEffect: 'None' as TriggerEffect,
  keyword: 'None' as Keyword,
  keywordAbility: 'None' as KeywordAbility,
  activationTimingAbility: ['None'] as ActivationTimingAbility[],
  activationCondition: 'None' as ActivationCondition,
  apCost: 0 as number,
  isRaidable: false as boolean,
  color: 'red' as CardColor,
  bpData: null as BpData,
  attributeData: 'None' as AttributeData,
  needEnergyData: 0 as number,
  generatedEnergyData: 1 as GeneratedEnergyData,
}
