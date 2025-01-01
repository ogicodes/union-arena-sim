import type { GameState, Phase } from '../../types'
import {
  StartPhase,
  MovementPhase,
  MainPhase,
  EndPhase,
} from '../phases'

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
  private _phases: Phase[] = []

  constructor(gameState: GameState) {
    this._gameState = gameState
    /**
     * this._phases
     *
     * The phases in order:
     * 1. Start Phase
     * 2. Movement Phase
     * 3. Main Phase
     * 4. Attack Phase
     * 5. End Phase
     * */
    this._phases = [
      new StartPhase(gameState),
      new MovementPhase(gameState),
      new MainPhase(gameState),
      new EndPhase(gameState),
    ]
  }

  /**
   * executePhase
   *
   * Executes the current phase's actions.
   *
   * @returns void
   * */
  public executePhase(): void {
    const currentPhase = this._phases[this._gameState.currentPhaseIdx]
    switch (currentPhase.name) {
      case 'Start Phase':
        currentPhase.execute()
        this.advancePhase()
        break
      case 'Movement Phase':
        currentPhase.execute()
        break
      case 'Main Phase':
        currentPhase.execute()
        break
      case 'Attack Phase':
        console.log('Attack Phase')
        break
      case 'End Phase':
        currentPhase.execute()
        this.advancePhase()
        break
    }
  }

  /**
   * advancePhase
   *
   * Advances to the next phase after completion.
   *
   * @returns number - current phase idx
   * */
  private advancePhase(): number {
    this._gameState.nextPhase()
    if (this._gameState.currentPhaseIdx >= this._phases.length) {
      this._gameState.setPhase(0)
    }
    return this._gameState.currentPhaseIdx
  }
}
