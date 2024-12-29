import { Socket, Namespace } from 'socket.io'
import { Player } from '../engine/components/Player'
import { Card } from '../engine/components/Card'
import { GameEngine } from '../engine/core/GameEngine'
import type {
  Player as PlayerType,
  GameEngine as GameEngineType,
  JoinGamePayload,
  Card as CardType,
} from '../types'

export const onJoin = (
  socket: Socket,
  payload: JoinGamePayload,
  namespace: Namespace,
) => {
  const { playerName, playerDeck, playerActionPoints, opponentName } =
    payload

  const roomName = [playerName, opponentName].sort().join('-')
  const room = namespace.adapter.rooms.get(roomName)

  /** If the room is full, send an error. */
  if (room && room.size >= 2) {
    socket.emit('game:error', { message: 'Room is full' })
    return
  }

  /** Add player to the room. */
  socket.join(roomName)
  console.log(`${playerName} joined room: ${roomName}`)

  /** Emit to the opponent that the player has joined. */
  socket.to(roomName).emit('game:playerJoined', { playerName })
  socket.emit('game:joined', { roomName })

  /**
   * Initialize the players in the GameState
   * */

  if (room && room.size === 1) {
    //const deck: CardType[] = []
    for (let i = 0; i < playerDeck.length; i++) {}

    // first player
    //const playerOne = new Player(
    //  playerName,
    //  playerDeck,
    //  playerActionPoints,
    //)
  }

  /**
   * Handles the disconnect and cleanup
   * */
  socket.on('disconnect', () => {
    console.log(`${playerName} disconnected from room: ${roomName}`)
    socket.to(roomName).emit('game:playerLeft', { playerName })
  })
}

export const onEndPhase = (socket: Socket, payload: any) => {
  console.log(payload)
  console.log(socket)
}
