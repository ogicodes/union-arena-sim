import { Server } from 'socket.io'
import { onJoin } from '../controllers/game'
import { onEndPhase } from '../controllers/game'

const gameModule = (io: Server) => {
  const gameNamespace = io.of('/game')
  gameNamespace.on('connection', socket => {
    console.info(`Player connected: ${socket.id}`)

    socket.on('game:join', payload =>
      onJoin(socket, payload, gameNamespace),
    )
    socket.on('game:endPhase', payload => onEndPhase(socket, payload))

    socket.on('disconnect', () => {
      console.info(`Player disconnected: ${socket.id}`)
    })
  })
}

export { gameModule }
