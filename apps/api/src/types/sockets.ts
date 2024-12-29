import type { FormattedCard } from './card'

export interface JoinGamePayload {
  playerName: string
  playerDeck: FormattedCard[]
  playerActionPoints: string[]
  opponentName: string
}
