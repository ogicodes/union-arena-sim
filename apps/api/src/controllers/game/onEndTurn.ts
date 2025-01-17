import type { Namespace, Socket } from 'socket.io'
import type { EndPhasePayload } from '../../types'
import { getEngine } from '../../utils/get-engine'

/**
 * onEndPhase
 *
 * Handles the event 'turn:end'
 *
 * @returns void
 * */
export const onEndTurn = (
  _socket: Socket,
  payload: EndPhasePayload,
  namespace: Namespace,
): void => {
  const { roomName } = payload
  const engine = getEngine(roomName)

  engine.gameEngine?.endTurn()
  const gameState = engine.gameEngine?.gameState

  namespace.to(roomName).emit('turn:end', {
    message: 'Turn concluded',
    gameState: gameState,
  })
}
