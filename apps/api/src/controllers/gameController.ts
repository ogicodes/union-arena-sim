import { Socket, Namespace } from 'socket.io'
import type { JoinGamePayload } from '../types'

export const onJoin = (
  socket: Socket,
  payload: JoinGamePayload,
  namespace: Namespace,
) => {
  const { playerName, opponentName } = payload

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

  socket.on('disconnect', () => {
    console.log(`${playerName} disconnected from room: ${roomName}`)
    socket.to(roomName).emit('game:playerLeft', { playerName })
  })
}

export const onEndPhase = (socket: Socket, payload: any) => {
  console.log(payload)
  console.log(socket)
}
