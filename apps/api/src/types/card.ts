import { Card as CardClass } from '../engine/components/Card'
import { ActionPointCard as ActionPointCardClass } from '../engine/components/ActionPointCard'

export type CardType = 'character' | 'event' | 'site' | 'action point'

export type Card = InstanceType<typeof CardClass>
export type ActionPointCard = InstanceType<
  typeof ActionPointCardClass
>

export interface FormattedCard {
  cardNo: string
  rarity: string | null
  name: string
  seriesName: string
  series: string
  needEnergyData: number | null
  color: string | null
  apData: number
  categoryData: string
  bpData: number | null
  attributeData: string | null
  generatedEnergyData: number
  effectData: string | null
  triggerData: string | null
  getInfoData: string | null
}

export type CardColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple'
