import type { GameState, Phases } from '../../types'
import { Phase } from './Phase'

class StartPhase extends Phase {
  protected _name: Phases = 'Start Phase'
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
    this.flipActionPoints()
  }

  /**
   * private unrestCards
   *
   * Takes the current activePlayer and unrests
   * any cards that are currently resting
   *
   * @returns void
   * */
  private unrestCards(): void {
    const { activePlayer } = this._gameState
    const { actionPointsLine, frontLine, energyLine } =
      this._gameState.getBoard(activePlayer.id)
    actionPointsLine.forEach(card => {
      if (card.data.state.isRested) {
        card.rest()
      }
    })
    frontLine.forEach(card => {
      if (card.data.state.isRested) {
        card.rest()
      }
    })
    energyLine.forEach(card => {
      if (card.data.state.isRested) {
        card.rest()
      }
    })
  }

  /**
   * private flipActionPoints
   *
   * Calculates how many action point cards
   * need to flip for each player
   *
   * @returns void
   * */
  private flipActionPoints(): void {
    const { turnCount, activePlayer } = this._gameState
    const { actionPointsLine } = this._gameState.getBoard(
      activePlayer.id,
    )

    if (turnCount > 3) return

    let flipsToMake = 0

    if (activePlayer.id === this._gameState.players[0].id) {
      if (turnCount === 1) {
        flipsToMake = 1
      } else if (turnCount === 2) {
        flipsToMake = 2
      } else if (turnCount >= 3) {
        flipsToMake = 3
      }
    } else if (activePlayer.id === this._gameState.players[1].id) {
      if (turnCount === 1 || turnCount === 2) {
        flipsToMake = 2
      } else if (turnCount >= 3) {
        flipsToMake = 3
      }
    }

    for (let i = 0; i < flipsToMake; i++) {
      actionPointsLine[i].flip()
    }
  }
}

export { StartPhase }
