import type { BlockingMovement, GameState, Phases } from '../../types'
import { Phase } from './Phase'

class AttackPhase extends Phase {
  protected _name: Phases = 'Attack Phase'
  private _gameState: GameState

  constructor(gameState: GameState) {
    super()
    this._gameState = gameState
  }

  protected _execute(): void {
    console.log(`Attack Phase: ${this._gameState.activePlayer.id}`)
  }

  private attack(cardIdx: number, targetIdx: number): void {
    const { activePlayer, inactivePlayer } = this._gameState
    const { frontLine } = this._gameState.getBoard(activePlayer.id)
    const attackingCard = frontLine[cardIdx]

    /** Choose a card you're attacking with, switch it to resting. */
    attackingCard.rest()
  }

  private block(block: BlockingMovement): void {
    const { inactivePlayer } = this._gameState
    const { frontLine, lifePoints } = this._gameState.getBoard(
      inactivePlayer.id,
    )

    switch (block) {
      case 'LIFE':
        //const lifeCard = life
        break
      case 'FRONTLINE':
        break
    }
  }
}

export { AttackPhase }
