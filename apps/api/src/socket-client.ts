import 'dotenv/config'
import { io } from 'socket.io-client'

const PORT = process.env.API_PORT || 1234

const URL = `http://localhost:${PORT}`

const socket = io(URL)

socket.on('connect', () => {
  console.log(`Connected to server: ${socket.id}`)
  socket.emit('message', 'Hello from client!')
})

socket.on('test', data => {
  console.log('Server response:', data)
})

socket.on('disconnect', reason => {
  console.log(`Disconnected: ${reason}`)
})
