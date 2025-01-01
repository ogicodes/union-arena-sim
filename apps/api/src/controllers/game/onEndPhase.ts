import { Socket } from 'socket.io'

/**
 * onEndPhase
 *
 * Handles the event 'game:endPhase'
 *
 * @returns void
 * */
export const onEndPhase = (
  socket: Socket,
  payload: { message: string },
): void => {
  console.log(payload)
  console.log(socket)
}
