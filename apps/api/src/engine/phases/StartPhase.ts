import type { GameState, Phases } from '../../types'
import { Phase } from './Phase'

class StartPhase extends Phase {
  protected _name: Phases = 'Start Phase'
  private _gameState: GameState

  constructor(gameState: GameState) {
    super()
    this._gameState = gameState
  }

  protected _execute(): void {
    console.log(
      `Executing: ${this._name} @ ${this._gameState.currentPhaseIdx}`,
    )
  }
}

export { StartPhase }
