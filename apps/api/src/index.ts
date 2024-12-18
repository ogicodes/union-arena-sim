import 'dotenv/config'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { helloModule } from './modules/helloModule'

const PORT = process.env.API_PORT || 1234

const server = createServer()
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

/** configure modules */
helloModule(io)

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
