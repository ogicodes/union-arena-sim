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

  /**
   * endPhase
   *
   * Handles ending the current turn:
   *  1. Sets the current activePlayerIndex on the GameState to the next player.
   *  2. Only increments the turnCount when reached the last player.
   *
   *  @returns void
   * */
  endTurn(): void {
    this._activePlayerIndex =
      (this._activePlayerIndex + 1) % this._players.length

    if (this._activePlayerIndex === 0) {
      this._turnCount++
    }
    console.log(`turn ended`)
  }

  /**
   * public setState
   *
   * This method allows setting specific gameState properties.
   * It mutates the internal property by updating it with the provided data.
   *
   * @param property The property of the gameState to modify
   * @param data The new data to assign to the property
   * @returns void
   * */
  /* istanbul ignore next */
  public setState<K extends keyof GameState>(
    property: K,
    data: GameState[K],
  ): void {
    ;(this as any)['_' + property] = data // eslint-disable-line
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
   * get activePlayerIndex
   *
   * Retuns the active player index on GameState
   *
   * @returns number
   * */
  get activePlayerIndex(): number {
    return this._activePlayerIndex
  }

  /**
   * get inactivePlayer
   *
   * Returns the inactivePlayer object on GameState.
   *
   * @returns Player
   * */
  /* istanbul ignore next */
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
   * Read-only access to the turnCount.
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
   * on the TurnManager.
   *
   * @returns number
   * */
  get currentPhaseIdx(): number {
    return this._currentPhaseIdx
  }

  /**
   * nextPhase
   *
   * Increments the currentPhaseIdx.
   *
   * @returns number
   * */
  public nextPhase(): number {
    return (this._currentPhaseIdx += 1)
  }

  /**
   * setPhase
   *
   * Sets the phase with a zero-based idx.
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
   * public setBoardProperty
   *
   * Sets the board with a specific key and values.
   *
   * @param playerId - string
   * @param area - The area on the board
   * @param data - The data to set on the board
   * @returns void
   * */
  public setBoardProperty<K extends keyof PlayerBoard>(
    playerId: string,
    area: K,
    data: PlayerBoard[K],
  ): void {
    const board = this.getBoard(playerId)
    const areaData = board[area]
    areaData.length = 0
    ;(areaData as any[]).push(...data) // eslint-disable-line
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
