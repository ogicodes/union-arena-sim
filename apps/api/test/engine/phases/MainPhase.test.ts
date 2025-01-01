import {
  describe,
  expect,
  it,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals'
import { MainPhase } from '../../../src/engine/phases'
import { GameState } from '../../../src/engine/core/GameState'
import { Card } from '../../../src/engine/components/Card'
import { Player } from '../../../src/engine/components/Player'
import { ActionPointCard } from '../../../src/engine/components/ActionPointCard'
import type {
  GameState as GameStateType,
  ActionPointCard as ActionPointCardType,
  Card as CardType,
  Player as PlayerType,
} from '../../../src/types'
import {
  mockActionCardData,
  mockDeckCardData,
} from '../../fixtures/card-fixture'

describe('MainPhase', () => {
  let mainPhase: InstanceType<typeof MainPhase>
  let gameState: GameStateType
  let mockPlayerOne: PlayerType

  beforeEach(done => {
    const mockPlayerDeck: CardType[] = []
    const mockActionCardCollectionOne: ActionPointCardType[] = []
    const mockActionCardCollectionTwo: ActionPointCardType[] = []

    const mockCard = new Card(
      mockDeckCardData.name,
      mockDeckCardData.effectData,
      mockDeckCardData.cardType,
      mockDeckCardData.triggerData,
      mockDeckCardData.apCost,
      mockDeckCardData.color,
      mockDeckCardData.bpData,
      mockDeckCardData.needEnergyData,
      mockDeckCardData.generatedEnergyData,
    )

    const mockActionCard = new ActionPointCard(
      mockActionCardData.name,
    )

    for (let i = 0; i < 50; i++) {
      mockPlayerDeck.push(mockCard)
    }

    for (let i = 0; i < 3; i++) {
      mockActionCardCollectionOne.push(mockActionCard)
      mockActionCardCollectionTwo.push(mockActionCard)
    }

    mockPlayerOne = new Player(
      'player-one',
      mockPlayerDeck,
      mockActionCardCollectionOne,
    )
    const mockPlayerTwo = new Player(
      'player-two',
      mockPlayerDeck,
      mockActionCardCollectionTwo,
    )

    gameState = new GameState([mockPlayerOne, mockPlayerTwo])
    gameState.initialize()

    mainPhase = new MainPhase(gameState)
    done()
  })

  afterEach(done => {
    done()
  })

  it('should initalize correctly', () => {
    expect(mainPhase.name).toBe('Main Phase')
  })

  it('should call the execute function', () => {
    const executeSpy = jest.spyOn(mainPhase, 'execute')
    const consoleSpy = jest.spyOn(console, 'log')

    mainPhase.execute()

    expect(executeSpy).toHaveBeenCalled()
    expect(consoleSpy).toHaveBeenCalledWith(
      `Main Phase: ${mockPlayerOne.id}`,
    )
  })

  it('should allow a card to move from the hand to the frontLine', () => {
    const movementSpy = jest.spyOn(mainPhase, 'movement')
    const { activePlayer } = gameState
    const { frontLine } = gameState.getBoard(activePlayer.id)
    mainPhase.movement('HAND_TO_FRONTLINE', 1, 0)

    expect(movementSpy).toHaveBeenCalled()
    expect(activePlayer.hand).toHaveLength(6)
    expect(frontLine[0]).toBeInstanceOf(Card)
    expect(frontLine).toHaveLength(1)
  })

  it('should allow a card to move from the hand to the energyLine', () => {
    const movementSpy = jest.spyOn(mainPhase, 'movement')
    const { activePlayer } = gameState
    const { energyLine } = gameState.getBoard(activePlayer.id)
    mainPhase.movement('HAND_TO_ENERGYLINE', 1, 0)

    expect(movementSpy).toHaveBeenCalled()
    expect(activePlayer.hand).toHaveLength(6)
    expect(energyLine[0]).toBeInstanceOf(Card)
    expect(energyLine).toHaveLength(1)
  })

  it('should sideline a card from the frontLine', () => {
    const { activePlayer } = gameState
    const { sideline, frontLine } = gameState.getBoard(
      activePlayer.id,
    )
    mainPhase.movement('HAND_TO_FRONTLINE', 1, 0)

    const sideLineCardSpy = jest.spyOn(mainPhase, 'sideLineCard')
    mainPhase.sideLineCard('frontLine', 0)

    expect(sideLineCardSpy).toHaveBeenCalled()
    expect(frontLine).toHaveLength(0)
    expect(sideline).toHaveLength(1)
  })

  it('should sideline a card from the energyLine', () => {
    const { activePlayer } = gameState
    const { sideline, energyLine } = gameState.getBoard(
      activePlayer.id,
    )
    mainPhase.movement('HAND_TO_ENERGYLINE', 1, 0)

    const sideLineCardSpy = jest.spyOn(mainPhase, 'sideLineCard')
    mainPhase.sideLineCard('energyLine', 0)

    expect(sideLineCardSpy).toHaveBeenCalled()
    expect(energyLine).toHaveLength(0)
    expect(sideline).toHaveLength(1)
  })

  it('should throw an error to sideline a card out of bounds', () => {
    jest.spyOn(mainPhase, 'sideLineCard')

    expect(() =>
      mainPhase.sideLineCard('energyLine', 8),
    ).toThrowError('Invalid card index location: 8')
  })
})
