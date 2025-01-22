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

  if (!engine.gameEngine) {
    throw new Error('Unable to fetch the engine')
  }

  const { gameState, turnManager } = engine.gameEngine
  const { currentPhase: phase } = turnManager

  if (!phase) {
    throw new Error('Error fetching the current phase')
  }

  if (!gameState) {
    throw new Error('Unable to fetch the gameState')
  }

  switch (phase.name) {
    case 'Movement Phase': {
      const movementPhase = phase as InstanceType<
        typeof MovementPhase
      >
      movementPhase.movement(
        action.type as MovementPhaseMovement,
        action.cardIdx,
        action.targetIdx,
      )
      break
    }
    case 'Main Phase': {
      const mainPhase = phase as InstanceType<typeof MainPhase>
      mainPhase.movement(
        action.type as MainPhaseMovement,
        action.cardIdx,
        action.targetIdx,
      )
      break
    }
  }

  namespace.to(roomName).emit('move:ok', {
    currentPhaseIdx: gameState.currentPhaseIdx,
    currentPhase: turnManager.currentPhase.name,
    activePlayer: gameState.players[gameState.activePlayerIndex].name,
    ActivePlayerBoard: gameState.getBoard(gameState.activePlayer.id),
    InactivePlayerBoard: gameState.getBoard(
      gameState.inactivePlayer.id,
    ),
    turnCount: gameState.turnCount,
    gameOver: gameState.gameOver,
  })
}
