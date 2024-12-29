import { Socket, Namespace } from 'socket.io'
import { Player } from '../engine/components/Player'
import { Card } from '../engine/components/Card'
import { GameEngine } from '../engine/core/GameEngine'
import type {
  GameEngine as GameEngineType,
  JoinGamePayload,
  Card as CardType,
  CardType as CharacterType,
  CardColor,
  ActionPointCard as ActionPointCardType,
  FormattedCard,
} from '../types'
import { ActionPointCard } from '../engine/components/ActionPointCard'

const roomGameData = new Map<
  string,
  {
    player1?: Player
    player2?: Player
    gameEngine?: GameEngineType
  }
>()

export const onJoin = (
  socket: Socket,
  payload: JoinGamePayload,
  namespace: Namespace,
) => {
  const { playerName, playerDeck, playerActionPoints, opponentName } =
    payload

  /**
   * Construct a room name with players namespace
   *
   * Alternatively, could pass a unique ID generated on the frontend
   * for a room name, and catch that as the payload above instead.
   * */
  const roomName = [playerName, opponentName].sort().join('-')
  const room = namespace.adapter.rooms.get(roomName)

  /** If the room is full, send an error. */
  if (room && room.size >= 2) {
    socket.emit('game:error', { message: 'Room is full' })
    return
  }

  /** Add player to the room. */
  socket.join(roomName)
  console.log(`${playerName} joined room: ${roomName}`)

  /** Emit to the opponent that the player has joined. */
  socket.to(roomName).emit('game:playerJoined', { playerName })
  socket.emit('game:joined', { roomName })

  const createPlayer = (
    name: string,
    deck: FormattedCard[],
    actionPoints: string[],
  ): Player => {
    const constructedDeck = deck.map(
      data =>
        new Card(
          data.name,
          data.effectData,
          data.categoryData as CharacterType,
          data.triggerData,
          data.apData,
          data.color as CardColor,
          data.bpData,
          data.needEnergyData,
          data.generatedEnergyData,
        ),
    )
    const constructedAPDeck = actionPoints.map(
      data => new ActionPointCard(data),
    )
    return new Player(name, constructedDeck, constructedAPDeck)
  }

  if (!roomGameData.has(roomName)) {
    // player 1 Joins
    const player1 = createPlayer(
      playerName,
      playerDeck,
      playerActionPoints,
    )
    roomGameData.set(roomName, { player1 })
  } else {
    // player 2 joins
    const roomData = roomGameData.get(roomName)!
    const player2 = createPlayer(
      playerName,
      playerDeck,
      playerActionPoints,
    )
    roomData.player2 = player2

    const gameEngine = new GameEngine([roomData.player1!, player2])
    roomData.gameEngine = gameEngine

    gameEngine.startGame()

    namespace.to(roomName).emit('game:state', {
      message: 'Game has started',
      gameState: gameEngine,
    })
  }

  /**
   * Handles the disconnect and cleanup
   * */
  socket.on('disconnect', () => {
    console.log(`${playerName} disconnected from room: ${roomName}`)
    socket.to(roomName).emit('game:playerLeft', { playerName })
  })
}

export const onEndPhase = (socket: Socket, payload: any) => {
  console.log(payload)
  console.log(socket)
}
