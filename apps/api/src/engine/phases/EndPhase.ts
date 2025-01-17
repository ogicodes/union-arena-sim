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
    this.unrestCards()
    this._gameState.endTurn()
  }

  /**
   * private unrestCards
   *
   * At the end of the turn, switch all cards on the
   * gameState frontLine and energyLine to be unrested.
   *
   * @returns void
   * */
  private unrestCards(): void {
    const { activePlayer } = this._gameState
    const { frontLine, energyLine } = this._gameState.getBoard(
      activePlayer.id,
    )

    for (let i = 0; i < frontLine.length - 1; i++) {
      frontLine[i].rest()
    }

    for (let i = 0; i < energyLine.length - 1; i++) {
      energyLine[i].rest()
    }
  }
}

export { EndPhase }
