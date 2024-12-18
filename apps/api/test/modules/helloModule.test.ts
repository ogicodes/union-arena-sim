import { Server } from 'socket.io'
import { io as clientIo, Socket } from 'socket.io-client'
import { createServer, Server as HttpServer } from 'http'
import {
  beforeAll,
  afterAll,
  jest,
  describe,
  test,
} from '@jest/globals'
import { helloModule } from '../../src/modules/helloModule'
import { processMessage } from '../../src/services/messageService'

jest.mock('../../src/services/messageService', () => ({
  processMessage: jest.fn().mockReturnValue('Processed Message'),
}))

describe('helloModule', () => {
  let server: HttpServer
  let io: Server
  let clientSocket: Socket

  beforeAll(done => {
    server = createServer()
    io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    })

    helloModule(io)

    server.listen(() => {
      const port = (server.address() as { port: number }).port
      clientSocket = clientIo(`http://localhost:${port}/io`)
      done()
    })
  })

  afterAll(done => {
    clientSocket.close()
    io.close()
    server.close()
    done()
  })

  test('should call processMessage and broadcast the message', done => {
    clientSocket.on('newMessage', (processedMessage: string) => {
      expect(processedMessage).toBe('Processed Message')
      done()
    })

    clientSocket.emit('sendMessage', 'Test Message')
  })

  test('should call processMessage when message is sent', done => {
    clientSocket.on('newMessage', () => {
      expect(processMessage).toHaveBeenCalledWith('Test Message')
      done()
    })

    clientSocket.emit('sendMessage', 'Test Message')
  })
})
