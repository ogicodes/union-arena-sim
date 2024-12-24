import type { Movement, GameState, Phases } from '../../types'
import { Phase } from './Phase'

class MovementPhase extends Phase {
  protected _name: Phases = 'Movement Phase'
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
    console.log(`Movement Phase: ${this._gameState.activePlayer.id}`)
  }

  /**
   * public movement
   *
   * Determines the type of movement and delegates to a specific method.
   *
   * @param type Movement - The type of movement.
   * @param cardIdx number - The index of the card to move.
   * @param targetIdx number - The target index on the destination.
   * @returns void
   * */
  public movement(
    type: Movement,
    cardIdx: number,
    targetIdx: number,
  ): void {
    switch (type) {
      case 'HAND_TO_FRONTLINE':
        this.moveHandToFrontLine(cardIdx, targetIdx)
        break
      case 'FRONTLINE_TO_ENERGYLINE':
        this.moveFrontLineToEnergyLine(cardIdx, targetIdx)
        break
      case 'ENERGYLINE_TO_FRONTLINE':
        this.moveEnergyLineToFrontLine(cardIdx, targetIdx)
        break
    }
  }

  /**
   * private moveFrontLineToEnergyLine
   *
   * @param frontLineIdx number - The index of the Card on the frontLine to move.
   * @param energyLineIdx number - The index position on the energyLine to move the Card to.
   * @returns idx number - The Card position on the energyLine.
   * */
  private moveFrontLineToEnergyLine(
    frontLineIdx: number,
    energyLineIdx: number,
  ): number {
    const { activePlayer } = this._gameState
    const { energyLine, frontLine } = this._gameState.getBoard(
      activePlayer.id,
    )

    const card = frontLine[frontLineIdx]

    if (!card) {
      throw new Error(
        'No card exists at the specified energyLine index.',
      )
    }

    if (energyLine[energyLineIdx]) {
      throw new Error(
        'The specified energyLine position is already occupied.',
      )
    }

    frontLine.splice(frontLineIdx, 1)
    energyLine.splice(energyLineIdx, 0, card)

    return energyLineIdx
  }

  /**
   * private moveEnergyLineToFrontLine
   *
   * Handles the movement of a card from the energyLine to the frontLine
   *
   * @param energyLineIdx number - The index of the Card on the energyLine to move.
   * @param frontLineIdx number - The index position on the frontLine to move the Card to.
   * @returns idx number - The Card position on the frontLine.
   * */
  private moveEnergyLineToFrontLine(
    energyLineIdx: number,
    frontLineIdx: number,
  ): number {
    const { activePlayer } = this._gameState
    const { energyLine, frontLine } = this._gameState.getBoard(
      activePlayer.id,
    )

    const card = energyLine[energyLineIdx]

    if (!card) {
      throw new Error(
        'No card exists at the specified energyLine index.',
      )
    }

    if (frontLine[frontLineIdx]) {
      throw new Error(
        'The specified frontLine position is already occupied.',
      )
    }

    energyLine.splice(energyLineIdx, 1)
    frontLine.splice(frontLineIdx, 0, card)

    return frontLineIdx
  }

  /**
   * private moveHandToFrontLine
   *
   * Handles the movement of a card from the hand to the frontLine
   *
   * @param handIdx number - The index of the Card on the hand to move.
   * @param frontLineIdx number - the index position on the frontLine to move the Card to.
   * @returns idx number - The Card position on the frontLine.
   * */
  private moveHandToFrontLine(
    handIdx: number,
    frontLineIdx: number,
  ): number {
    const { activePlayer } = this._gameState
    const { energyLine, frontLine } = this._gameState.getBoard(
      activePlayer.id,
    )

    const totalEnergy = energyLine.reduce(
      (acc, card) => acc + card.data.costs.generatedEnergyData,
      0,
    )
    const card = activePlayer.pluck(handIdx)

    if (!card || card.data.costs.needEnergyData > totalEnergy) {
      throw new Error(
        'Card cannot be moved to the frontLine due to insufficient energy.',
      )
    }

    if (frontLine[frontLineIdx]) {
      throw new Error(
        'The specified frontLine position is already occupied.',
      )
    }

    frontLine.splice(frontLineIdx, 0, card)

    return frontLineIdx
  }
}

export { MovementPhase }
