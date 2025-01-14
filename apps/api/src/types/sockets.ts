import type { FormattedCard } from './card'
import type { Player, GameEngine } from '../types'
import type {
  MovementPhaseMovement,
  MainPhaseMovement,
} from '../types'

export interface JoinGamePayload {
  playerName: string
  playerDeck: FormattedCard[]
  playerActionPoints: string[]
  opponentName: string
}

export interface EndPhasePayload {
  roomName: string
}

export interface MoveActionPayload {
  roomName: string
  action: {
    type: MovementPhaseMovement | MainPhaseMovement
    cardIdx: number
    targetIdx: number
  }
}

export interface RoomData {
  player1?: Player
  player2?: Player
  gameEngine?: GameEngine
}
