import { GameState } from './GameState'
import { TurnManager } from './TurnManager'
import type { Socket } from 'socket.io'
import type {
  Player,
  GameState as GameStateType,
  TurnManager as TurnManagerType,
} from '../../types'

/**
 * GameEngine
 *
 * The game engine directly starts and stops the game,
 * and handles the main game loop.
 *
 * It takes players as it's only param,
 * and serves as the main entry point to the game.
 *
 * @param players Player[] - The array of 2 player models.
 * */
export class GameEngine {
  private _gameState: GameStateType
  private _io: Socket
  private _roomName: string
  public turnManager: TurnManagerType

  constructor(players: Player[], io: Socket, roomName: string) {
    this._gameState = new GameState(players, io, roomName)
    this.turnManager = new TurnManager(this._gameState)
    this._io = io
    this._roomName = roomName
  }

  /**
   * public startGame
   *
   * Serves as the main entry point for the game engine.
   *
   * @returns void
   * */
  public startGame(): void {
    console.info(`game has started`)

    this._gameState.initialize()
  }
}
