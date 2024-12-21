import { Card } from './card'
import { ActionPointCard } from './card'

/** A players board */
export interface PlayerBoard {
  frontLine: Card[]
  energyLine: Card[]
  actionPointsLine: ActionPointCard[]
  sideline: Card[]
  removalArea: Card[]
  lifePoints: Card[]
}

/** The GameState Board */
export type Board = Map<string, PlayerBoard>
