import { Server } from 'socket.io'
import { processMessage } from '../services/messageService'

const helloModule = (io: Server) => {
  const helloNamespace = io.of('/io')
  helloNamespace.on('connection', socket => {
    console.log(`${socket.id} connected to /io`)

    socket.on('sendMessage', message => {
      console.log(`Message received: ${message}`)
      const processedMessage = processMessage(message)
      // socket.emit('newMessage', processedMessage) // emit to sender only
      helloNamespace.emit('newMessage', processedMessage) // broadcast to all
    })

    socket.on('disconnect', () => {
      console.log(`User disconnected from /io`)
    })
  })
}

export { helloModule }
