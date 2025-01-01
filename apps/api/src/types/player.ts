export type Player = InstanceType<typeof PlayerClass>
import { Player as PlayerClass } from '../engine/components/Player'

export interface PlayerState {
  player: Player
}
