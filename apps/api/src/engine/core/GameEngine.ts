import { GameState } from './GameState'
import type { Player } from '../../types'
import { TurnManager } from './TurnManager'

export class GameEngine {
  private gameState
  public turnManager

  constructor(players: Player[]) {
    this.gameState = new GameState(players)
    this.turnManager = new TurnManager(this.gameState)
  }

  public startGame(): void {
    console.info(`game has started`)

    this.gameState.initialize()

    while (!this.gameState.gameOver) {
      this.turnManager.nextPhase()
    }
  }
}
