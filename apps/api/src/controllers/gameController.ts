import { Socket } from 'socket.io'

export const onJoin = (socket: Socket, payload: any) => {
  console.log(payload)
  console.log(socket)
}

export const onEndPhase = (socket: Socket, payload: any) => {
  console.log(payload)
  console.log(socket)
}
