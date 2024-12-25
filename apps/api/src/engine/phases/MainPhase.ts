import type {
  MainPhaseMovement as Movement,
  GameState,
  Phases,
} from '../../types'
import { Phase } from './Phase'

class MainPhase extends Phase {
  protected _name: Phases = 'Main Phase'
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
    console.log(`Main Phase: ${this._gameState.activePlayer.id}`)
  }

  /**
   * public placeCard
   *
   * Handles the card placing from the activePlayer.
   *
   * @param type Movement - The movement action that occurs.
   * @param cardIdx number - The index of the Card to move.
   * @param targetIdx number - The target index on the destination.
   * @returns void
   * */
  public movement(
    type: Movement,
    cardIdx: number,
    targetIdx: number,
  ): void {
    switch (type) {
      case 'HAND_TO_ENERGYLINE':
        this.moveCardFromHandToEnergyLine(cardIdx, targetIdx)
        break
      case 'HAND_TO_FRONTLINE':
        this.moveCardFromHandToFrontLine(cardIdx, targetIdx)
        break
    }
  }

  /**
   * public sideLineCard
   *
   * Sidelines a card from the board.
   *
   * @param {'frontLine' | 'energyLine'} location - An area on the board
   * @param cardIdx number - The cards position on the location to send to the sideLine
   * @returns void
   * */
  public sideLineCard(
    location: 'frontLine' | 'energyLine',
    cardIdx: number,
  ): void {
    const { activePlayer } = this._gameState
    const { sideline } = this._gameState.getBoard(activePlayer.id)
    const boardLocation = this._gameState.getBoard(activePlayer.id)[
      location
    ]

    if (cardIdx < 0 || cardIdx >= boardLocation.length) {
      throw new Error(`Invalid card index location: ${cardIdx}`)
    }

    const removedCard = boardLocation.splice(cardIdx, 1)[0]
    sideline.push(removedCard)
  }

  /**
   * private moveCardFromHandToFrontLine
   *
   * @param handIdx number - The index of the Card in the players hand.
   * @param frontLineIdx number - The index position on the frontLine to move the Card to.
   * @returns idx number - The Card position on the frontLine.
   * */
  private moveCardFromHandToFrontLine(
    handIdx: number,
    frontLineIdx: number,
  ): number {
    const { activePlayer } = this._gameState
    const { frontLine, energyLine } = this._gameState.getBoard(
      activePlayer.id,
    )

    const card = activePlayer.pluck(handIdx)
    const totalEnergy = energyLine.reduce((acc, card) => {
      return acc + card.data.costs.generatedEnergyData
    }, 0)

    if (!card) {
      throw new Error(
        'No card exists in the players hand with the specified index.',
      )
    }

    if (card.data.costs.needEnergyData > totalEnergy) {
      throw new Error(
        'The card does not meet the total energy requirement generated on the energyLine.',
      )
    }

    if (frontLine[frontLineIdx]) {
      throw new Error(
        'The specified frontLine position is already occupied.',
      )
    }

    frontLine.splice(frontLineIdx, 0, card)

    this.useActionPoint()

    return frontLineIdx
  }

  /**
   * private moveCardFromHandToEnergyLine
   *
   * @param handIdx number - The index of the Card in the players hand.
   * @param energyLineIdx number - The index position on the energyLine to move the Card to.
   * @returns idx number - The Card position on the energyLine.
   * */
  private moveCardFromHandToEnergyLine(
    handIdx: number,
    energyLineIdx: number,
  ): number {
    const { activePlayer } = this._gameState
    const { energyLine } = this._gameState.getBoard(activePlayer.id)

    const card = activePlayer.pluck(handIdx)

    if (!card) {
      throw new Error(
        'No card exists in the players hand with the specified index.',
      )
    }

    if (energyLine[energyLineIdx]) {
      throw new Error(
        'The specified energyLine position is already occupied.',
      )
    }

    energyLine.splice(energyLineIdx, 0, card)

    this.useActionPoint()

    return energyLineIdx
  }

  /**
   * private useActionPoint
   *
   * Switches an AP card to resting in order to consume an action.
   *
   * @returns void
   * */
  private useActionPoint(): void {
    const { activePlayer } = this._gameState

    const { actionPointsLine } = this._gameState.getBoard(
      activePlayer.id,
    )

    const availableEnergy = actionPointsLine.filter(
      card => !card.data.state.isRested,
    )

    if (availableEnergy.length === 0) {
      throw new Error('No available action points to consume.')
    }

    availableEnergy[0].rest()
  }
}

export { MainPhase }
