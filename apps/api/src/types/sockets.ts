import type { FormattedCard } from './card'
import type { Player, GameEngine } from '../types'

export interface JoinGamePayload {
  playerName: string
  playerDeck: FormattedCard[]
  playerActionPoints: string[]
  opponentName: string
}

export interface RoomData {
  player1?: Player
  player2?: Player
  gameEngine?: GameEngine
}
