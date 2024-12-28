import { Server } from 'socket.io'
import {
  onJoin as onJoinController,
  onEndPhase as onEndPhaseController,
} from '../controllers/gameController'

const gameModule = (io: Server) => {
  const gameNamespace = io.of('/game')
  gameNamespace.on('connection', socket => {
    console.info(`Player connected: ${socket.id}`)

    socket.on('game:join', payload =>
      onJoinController(socket, payload),
    )
    socket.on('game:endPhase', payload =>
      onEndPhaseController(socket, payload),
    )

    socket.on('disconnect', () => {
      console.info(`Player disconnected: ${socket.id}`)
    })
  })
}

export { gameModule }
