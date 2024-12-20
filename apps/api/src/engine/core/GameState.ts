import type {
  Player,
  ActionPointCard,
  Card,
  Board,
  PlayerBoard,
} from '../../types'

/**
 * GameState
 *
 * Handles the state of the current game.
 *
 * Serves as the single source of truth for all game states,
 * objects and current data.
 *
 * @param players Player[]
 * */
export class GameState {
  private _players: Player[]
  private _activePlayerIndex: number
  private _turnCount: number
  private _currentPhaseIdx: number
  private _board: Board
  private _gameOver: boolean

  constructor(players: Player[]) {
    this._players = players
    this._activePlayerIndex = 0
    this._turnCount = 1
    this._currentPhaseIdx = 0
    this._board = new Map()
    this._gameOver = false
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
    this._gameOver = false

    if (this.players.length > 2) {
      throw new Error(`A game cannot exceed more than 2 players.`)
    }

    // Draw 7 cards for the lifepoints
    for (let i = 0; i < this._players.length; i++) {
      const lifePointCardDraw: Card[] = []
      for (let j = 0; j < 7; j++) {
        const drawnCard = this._players[i].drawCard()
        if (drawnCard) {
          lifePointCardDraw.push(drawnCard)
        } else {
          console.error('no cards to draw for the lifepoints.')
        }
      }

      // Draw 7 cards for player hand
      for (let j = 0; j < 7; j++) {
        const drawnCard = this._players[i].drawCard()
        if (drawnCard) {
          this._players[i].addToHand(drawnCard)
        } else {
          console.error('no cards to draw for the hand.')
        }
      }

      // Draw 3 AP Cards
      const apCardDraw: ActionPointCard[] = []
      for (let j = 0; j < 3; j++) {
        apCardDraw.push(this._players[i].drawActionPointCard())
      }

      // Put the cards on the board
      this._board.set(this._players[i].id, {
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
   * endPhase
   *
   * Handles ending the current turn:
   *  1. Sets the current activePlayerIndex on the GameState to the next player.
   *  2. Increments the turn on the GameState.
   *
   *  @returns void
   * */
  endTurn(): void {
    this._activePlayerIndex =
      (this._activePlayerIndex + 1) % this._players.length
    this._turnCount++
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
    return this._players[this._activePlayerIndex]
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
      this._players.find(
        p => p.id !== this._players[this._activePlayerIndex].id,
      ) || this._players[0]
    )
  }

  /**
   * get turnCount
   *
   * Read-only access to the turnCount
   *
   * @returns number
   * */
  get turnCount(): number {
    return this._turnCount
  }

  /**
   * get phase
   *
   * Read-only access to the current phase's idx
   * on the TurnManager
   *
   * @returns number
   * */
  get currentPhaseIdx(): number {
    return this._currentPhaseIdx
  }

  /**
   * nextPhase
   *
   * Increments the currentPhaseIdx
   *
   * @returns number
   * */
  public nextPhase(): number {
    return (this._currentPhaseIdx += 1)
  }

  /**
   * nextPhase
   *
   * Increments the currentPhaseIdx
   *
   * @returns number
   * */
  /**
   * nextPhase
   *
   * Increments the currentPhaseIdx
   *
   * @returns number - current phase idx
   * */
  public setPhase(idx: number): number {
    return (this._currentPhaseIdx = idx)
  }

  /**
   * getBoard
   *
   * This method will return the board of the player with the given id.
   *
   * @param playerId string
   * @returns PlayerBoard
   * @throws will throw an error if the player's id does not exist on the GameState
   */
  getBoard(playerId: string): PlayerBoard {
    return this._board.get(playerId)!
  }

  /**
   * endGame
   *
   * Sets the gameOver state to true.
   *
   * @returns boolean
   * */
  endGame(): boolean {
    this._gameOver = true
    console.log(`game over`)
    return this._gameOver
  }

  /**
   * get gameOver
   *
   * Read-only access to gameOver, Returns if the game is over.
   *
   * @returns boolean
   * */
  get gameOver(): boolean {
    return this._gameOver
  }

  /**
   * get players
   *
   * Read-only access to players.
   *
   * @returns players Player[] - Players
   * */
  get players(): Player[] {
    return this._players
  }
}
