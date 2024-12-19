import type { GameState } from '../../types'

/**
 * TurnManager
 *
 * Handles the various actions and enforces the
 * rules that occur at various phases of the game.
 *
 * It directly controls the GameState and dictates what actions
 * a player in the GameState may execute at any point in time.
 * */
export class TurnManager {
  private _gameState: GameState

  constructor(gamestate: GameState) {
    this._gameState = gamestate
  }

  /** for test purposes only */
  public readGameState() {
    console.log(this._gameState)
  }
}
