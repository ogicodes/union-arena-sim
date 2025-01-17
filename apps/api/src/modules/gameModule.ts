import type { Server } from 'socket.io'
import { onJoin, onMove } from '../controllers/game'
import { onEndTurn } from '../controllers/game'

const gameModule = (io: Server) => {
  const gameNamespace = io.of('/game')
  gameNamespace.on('connection', socket => {
    console.info(`Player connected: ${socket.id}`)

    socket.on('game:join', payload =>
      onJoin(socket, payload, gameNamespace),
    )
    socket.on('turn:end', payload =>
      onEndTurn(socket, payload, gameNamespace),
    )
    socket.on('action:move', payload =>
      onMove(socket, payload, gameNamespace),
    )

    socket.on('disconnect', () => {
      console.info(`Player disconnected: ${socket.id}`)
    })
  })
}

export { gameModule }
