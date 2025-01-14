import { GameState } from './GameState'
import { TurnManager } from './TurnManager'
import type {
  Player,
  GameState as GameStateType,
  TurnManager as TurnManagerType,
} from '../../types'

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
  private _gameState: GameStateType
  private _turnManager: TurnManagerType

  constructor(players: Player[]) {
    this._gameState = new GameState(players)
    this._turnManager = new TurnManager(this._gameState)
  }

  /**
   * get turnManager
   *
   * Returns read-only access to the TurnManager
   *
   * @returns TurnManagerType
   * */
  get turnManager(): TurnManagerType {
    return this._turnManager
  }

  /**
   * get gameState
   *
   * Returns read-only access to the GameState
   *
   * @returns GameStateType
   * */
  get gameState(): GameStateType {
    return this._gameState
  }

  /**
   * public startGame
   *
   * Serves as the main entry point for the game engine.
   *
   * @returns void
   * */
  public startGame(): void {
    console.info(`game has started`)
    this._gameState.initialize()
  }

  /**
   * public endTurn
   *
   * Ends the current turn and advances the phase if at the last player.
   *
   * @returns void
   * */
  public endTurn(): void {
    this._gameState.endTurn()
    if (this._gameState.activePlayerIndex === 1) {
      this._turnManager.advancePhase()
    }
  }
}
