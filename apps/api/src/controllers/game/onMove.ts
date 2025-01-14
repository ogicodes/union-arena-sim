import type { Socket, Namespace } from 'socket.io'
import type {
  MoveActionPayload,
  MainPhaseMovement,
  MovementPhaseMovement,
} from '../../types'
import { getEngine } from '../../utils/get-engine'
import { MovementPhase, MainPhase } from '../../engine/phases'

/**
 * onMove
 *
 * Handle the event 'action:move'
 *
 * @returns void
 * */
export const onMove = (
  _socket: Socket,
  payload: MoveActionPayload,
  namespace: Namespace,
) => {
  const { roomName, action } = payload

  const engine = getEngine(roomName)
  const gameState = engine.gameEngine?.gameState
  const phase = engine.gameEngine?.turnManager.currentPhase

  if (!phase) {
    throw new Error('Error fetching the current phase')
  }

  switch (phase.name) {
    case 'Movement Phase':
      const movementPhase = phase as InstanceType<
        typeof MovementPhase
      >
      movementPhase.movement(
        action.type as MovementPhaseMovement,
        action.cardIdx,
        action.targetIdx,
      )
      break
    case 'Main Phase':
      const mainPhase = phase as InstanceType<typeof MainPhase>
      mainPhase.movement(
        action.type as MainPhaseMovement,
        action.cardIdx,
        action.targetIdx,
      )
      break
  }

  namespace.to(roomName).emit('move:ok', {
    message: 'Move ok',
    gameState: gameState,
  })
}
