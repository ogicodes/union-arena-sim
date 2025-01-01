import { GameState } from './GameState'
import { TurnManager } from './TurnManager'
import type { Player } from '../../types'

/**
 * GameEngine
 *
 * The game engine directly starts and stops the game,
 * and handles the main game loop.
 *
 * It takes players as it's only param,
 * and serves as the main entry point to the game.
 *
 * @param players Player[] - The array of 2 player models.
 * */
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
      this.turnManager.executePhase()
    }
  }
}
