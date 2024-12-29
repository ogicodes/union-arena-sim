import { Socket } from 'socket.io'

/**
 * onEndPhase
 *
 * Handles the event 'game:endPhase'
 *
 * @returns void
 * */
export const onEndPhase = (socket: Socket, payload: any): void => {
  console.log(payload)
  console.log(socket)
}
