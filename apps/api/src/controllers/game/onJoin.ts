import { Socket, Namespace } from 'socket.io'
import { GameEngine } from '../../engine/core/GameEngine'
import type { JoinGamePayload } from '../../types'
import { createPlayer } from '../../utils/create-player'
import { roomGameData } from '../../lib/roomGameData'

/**
 * onJoin
 *
 * Handles the event 'game:join'
 * 1. Constructs a room name using the player and opponent names.
 * 2. Constructs player instances from the payload.
 * 3. Sets a singleton instance of the players as they join.
 * 4. Starts the GameEngine when the room is full.
 *
 * @returns void
 * */
export const onJoin = (
  socket: Socket,
  payload: JoinGamePayload,
  namespace: Namespace,
): void => {
  const { playerName, playerDeck, playerActionPoints, opponentName } =
    payload

  const roomName = [playerName, opponentName].sort().join('-')
  const room = namespace.adapter.rooms.get(roomName)

  if (room && room.size >= 2) {
    socket.emit('game:error', { message: 'Room is full' })
    return
  }

  socket.join(roomName)
  console.log(`${playerName} joined room: ${roomName}`)

  socket.to(roomName).emit('game:playerJoined', { playerName })
  socket.emit('game:joined', { roomName })

  if (!roomGameData.has(roomName)) {
    const player1 = createPlayer(
      playerName,
      playerDeck,
      playerActionPoints,
    )
    roomGameData.set(roomName, { player1 })
  } else {
    const roomData = roomGameData.get(roomName)!
    const player2 = createPlayer(
      playerName,
      playerDeck,
      playerActionPoints,
    )
    roomData.player2 = player2

    const gameEngine = new GameEngine([roomData.player1!, player2])
    roomData.gameEngine = gameEngine

    gameEngine.startGame()

    namespace.to(roomName).emit('game:state', {
      message: 'Game has started',
      gameState: gameEngine,
    })
  }

  socket.on('disconnect', () => {
    console.log(`${playerName} disconnected from room: ${roomName}`)
    socket.to(roomName).emit('game:playerLeft', { playerName })
  })
}
