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
    this.drawCard()
  }

  /**
   * private drawCard
   *
   * At the start of the turn, players draw a card from their deck into their hands.
   * If there are no cards in the deck, it is gameover.
   *
   * @returns void
   * */
  private drawCard(): void {
    const { turnCount, activePlayer } = this._gameState
    if (turnCount !== 1) {
      const drawnCard = activePlayer.drawCard()
      if (drawnCard) {
        activePlayer.addToHand(drawnCard)
      } else {
        this._gameState.endGame()
      }
    }
  }

  /**
   * private unrestCards
   *
   * At the start of the turn, switch all AP cards
   * on the gameState board to be unrested.
   *
   * @returns void
   * */
  private unrestCards(): void {
    const { activePlayer } = this._gameState
    const { actionPointsLine } = this._gameState.getBoard(
      activePlayer.id,
    )

    for (let i = 0; i < actionPointsLine.length - 1; i++) {
      const card = actionPointsLine[i]
      if (card.data.state.isRested) {
        card.rest()
      }
    }
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
