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

  if (!engine || !engine.gameEngine) {
    throw new Error('Unable to fetch the engine')
  }

  const { gameState, turnManager } = engine.gameEngine

  if (!gameState) {
    throw new Error('Unable to fetch the gameState')
  }

  engine.gameEngine.endTurn()

  namespace.to(roomName).emit('turn:end', {
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
