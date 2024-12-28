import { createServer } from 'http'
import { Server } from 'socket.io'
import { gameModule } from './modules/gameModule'

const server = createServer()

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

/** configure modules */
gameModule(io)

export { server }
