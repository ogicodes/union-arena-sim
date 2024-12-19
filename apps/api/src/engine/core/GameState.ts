import type {
  Player,
  Phases,
  GameBoard,
  ActionPointCard,
} from '../../types'
import { Card } from '../components/Card'

/**
 * GameState
 *
 * Handles the state of the current game.
 * */
export class GameState {
  players: Player[]
  activePlayerIndex: number
  turnCount: number
  phase: Phases
  board: Map<
    string,
    {
      frontLine: Card[]
      energyLine: Card[]
      actionPointsLine: ActionPointCard[]
      sideline: Card[]
      removalArea: Card[]
      lifePoints: Card[]
    }
  >
  gameOver: boolean

  constructor(players: Player[]) {
    this.players = players
    this.activePlayerIndex = 0
    this.turnCount = 1
    this.phase = 'Start Phase'
    this.board = new Map()
    this.gameOver = false
  }

  /**
   * initialize
   *
   * Initializes the GameState object:
   *  0. Sets the gameOver to be false.
   *  1. Draw 7 cards for the lifepoints.
   *  2. Draw 7 Cards for the player hand.
   *  3. Draw 3 AP Cards for the game board.
   *  4. Puts all the cards on the board.
   *
   * @returns void
   * */
  initialize(): void {
    this.gameOver = false
    // Draw 7 cards for the lifepoints
    for (let i = 0; i < this.players.length; i++) {
      const lifePointCardDraw: Card[] = []
      for (let j = 0; j < 7; j++) {
        const drawnCard = this.players[i].drawCard()
        if (drawnCard) {
          lifePointCardDraw.push(drawnCard)
        } else {
          console.error('no cards to draw for the lifepoints.')
        }
      }

      // Draw 7 cards for player hand
      for (let j = 0; j < 7; j++) {
        const drawnCard = this.players[i].drawCard()
        if (drawnCard) {
          this.players[i].addToHand(drawnCard)
        } else {
          console.error('no cards to draw for the hand.')
        }
      }

      // Draw 3 AP Cards
      const apCardDraw: ActionPointCard[] = []
      for (let j = 0; j < 3; j++) {
        apCardDraw.push(this.players[i].drawActionPointCard())
      }

      // Put the cards on the board
      this.board.set(this.players[i].id, {
        frontLine: [],
        energyLine: [],
        actionPointsLine: apCardDraw,
        sideline: [],
        removalArea: [],
        lifePoints: lifePointCardDraw,
      })
    }
  }

  // INITIALIZE STAGE:
  //
  // [x] each player draws 7 cards
  // [x] each player draws another 7 cards, puts in life area.
  //
  // [x] each player puts 3 ap cards into the action point line.
  //
  // --------------------------------------------------------

  // GAME STAGE:
  //
  // [] player 1 flips 1 ap card upright
  // [] player 1 does their thing.
  //
  // [] player 2 flips 2 ap cards upright
  // [] player 2 does their thing.

  /**
   * nextPhase
   *
   * Handles rotating the current phase to the next phase.
   *
   * @returns void
   * */
  nextPhase(): void {
    const phases: Phases[] = [
      'Start Phase',
      'Movement Phase',
      'Main Phase',
      'Attack Phase',
      'End Phase',
    ]
    const currentPhaseIdx = phases.indexOf(this.phase)
    this.phase = phases[(currentPhaseIdx + 1) % phases.length]
  }

  /**
   * endPhase
   *
   * Handles ending the current turn:
   *  1. Sets the current activePlayerIndex on the GameState to the next player.
   *  2. Increments the turn on the GameState.
   *
   *  @returns void
   * */
  endTurn(): void {
    this.activePlayerIndex =
      (this.activePlayerIndex + 1) % this.players.length
    this.turnCount++
    console.log(`turn ended`)
  }

  /**
   * get activePlayer
   *
   * Returns the active player object on GameState.
   *
   * @returns Player
   * */
  get activePlayer(): Player {
    return this.players[this.activePlayerIndex]
  }

  /**
   * get inactivePlayer
   *
   * Returns the inactivePlayer object on GameState.
   *
   * @returns Player
   * */
  get inactivePlayer(): Player {
    return (
      this.players.find(
        p => p.id !== this.players[this.activePlayerIndex].id,
      ) || this.players[0]
    )
  }

  /**
   * getBoard
   *
   * This method will return the board of the player with the given id.
   *
   * @param playerId string
   * @returns GameBoard
   * @throws will throw an error if the player's id does not exist on the GameState
   */
  getBoard(playerId: string): GameBoard {
    return this.board.get(playerId)!
  }

  /**
   * endGame
   *
   * Sets the gameOver state to true.
   *
   * @returns boolean
   * */
  endGame(): boolean {
    this.gameOver = true
    console.log(`game over`)
    return this.gameOver
  }
}
