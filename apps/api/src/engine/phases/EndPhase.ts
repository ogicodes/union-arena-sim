import type { GameState, Phases } from '../../types'
import { Phase } from './Phase'

class EndPhase extends Phase {
  protected _name: Phases = 'End Phase'
  private _gameState: GameState

  constructor(gameState: GameState) {
    super()
    this._gameState = gameState
  }

  /**
   * protected _execute
   *
   * The main entry point that gets executed
   *
   * @returns void
   * */
  protected _execute(): void {
    this._gameState.endTurn()
  }
}

export { EndPhase }
