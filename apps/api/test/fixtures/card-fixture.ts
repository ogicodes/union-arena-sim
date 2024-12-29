import { CardColor, CardType } from '../../src/types/index'

export const mockActionCardData = {
  name: 'mock-action-point-card',
}

export const mockDeckCardData = {
  name: 'mock-card' as string,
  effectData: 'mock-effect-data' as string,
  cardType: 'character' as CardType,
  triggerData: null,
  apCost: 0 as number,
  color: 'red' as CardColor,
  bpData: null,
  needEnergyData: 0 as number,
  generatedEnergyData: 1 as number,
}
