import { Card } from '../engine/components/Card'
import { ActionPointCard } from '../engine/components/ActionPointCard'
import { Player } from '../engine/components/Player'
import type {
  CardType as CharacterType,
  CardColor,
  FormattedCard,
} from '../types'

export const createPlayer = (
  name: string,
  deck: FormattedCard[],
  actionPoints: string[],
): Player => {
  const constructedDeck = deck.map(
    data =>
      new Card(
        data.name,
        data.effectData,
        data.categoryData as CharacterType,
        data.triggerData,
        data.apData,
        data.color as CardColor,
        data.bpData,
        data.needEnergyData,
        data.generatedEnergyData,
      ),
  )
  const constructedAPDeck = actionPoints.map(
    data => new ActionPointCard(data),
  )
  return new Player(name, constructedDeck, constructedAPDeck)
}
