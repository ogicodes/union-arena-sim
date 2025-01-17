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
  let mockCard: Card
  let mockActionCard: InstanceType<typeof ActionPointCard>

  beforeEach(done => {
    const mockPlayerDeck: CardType[] = []
    const mockActionCardCollectionOne: ActionPointCardType[] = []
    const mockActionCardCollectionTwo: ActionPointCardType[] = []

    mockCard = new Card(
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

    mockActionCard = new ActionPointCard(mockActionCardData.name)

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

  it('should route the correct movement to moveCardFromHandToEnergyLine', () => {
    const { activePlayer } = gameState
    const { energyLine } = gameState.getBoard(activePlayer.id)
    const movement = 'HAND_TO_ENERGYLINE'
    const mockCardIdx = 0
    const mockTargetIdx = 0

    const energyLineBefore = energyLine.length

    mainPhase.movement(movement, mockCardIdx, mockTargetIdx)

    expect(energyLine.length).toBe(energyLineBefore + 1)
    expect(energyLine).toContain(mockCard)
  })

  it('should allow a card to move from the hand to the frontLine', () => {
    const movementSpy = jest.spyOn(mainPhase, 'movement')
    const { activePlayer } = gameState
    const mockPluck = jest.spyOn(activePlayer, 'pluck')
    const { frontLine, energyLine } = gameState.getBoard(
      activePlayer.id,
    )

    mainPhase.movement('HAND_TO_FRONTLINE', 1, 0)

    const totalEnergy = energyLine.reduce((acc, card) => {
      return acc + card.data.costs.generatedEnergyData
    }, 0)

    expect(totalEnergy).toBe(0)
    expect(movementSpy).toHaveBeenCalled()
    expect(mockPluck).toHaveBeenCalled()
    expect(activePlayer.hand).toHaveLength(6)
    expect(frontLine[0]).toBeInstanceOf(Card)
    expect(frontLine).toHaveLength(1)
  })

  it('should throw an error if the frontLine position is already occupied when moving a card', () => {
    const { activePlayer } = gameState
    const movementSpy = jest.spyOn(mainPhase, 'movement')

    gameState.setBoardProperty(activePlayer.id, 'frontLine', [
      mockCard,
    ])
    activePlayer.setHand([mockCard])

    expect(() =>
      mainPhase.movement('HAND_TO_FRONTLINE', 0, 0),
    ).toThrowError(
      'The specified frontLine position is already occupied.',
    )
    expect(movementSpy).toHaveBeenCalled()
  })

  it('should throw an error if no cards exist in the players hand with a specified index', () => {
    const movementSpy = jest.spyOn(mainPhase, 'movement')
    expect(() =>
      mainPhase.movement('HAND_TO_FRONTLINE', 8, 0),
    ).toThrowError(
      'No card exists in the players hand with the specified index.',
    )
    expect(movementSpy).toHaveBeenCalledWith(
      'HAND_TO_FRONTLINE',
      8,
      0,
    )
  })

  it('should throw an error if the card does not meet the total energy requirement', () => {
    const { activePlayer } = gameState

    const mockHighEnergyCard = new Card(
      'mock-card', // name
      'mock-effect-data', // effectData
      'character', // cardType
      null, // triggerData
      0, // apCost
      'red', // color
      null, // bpData
      100, // needEnergyData
      1, // generatedEnergyData
    )

    gameState.setBoardProperty(activePlayer.id, 'energyLine', [
      mockCard,
      mockCard,
      mockCard,
    ])

    activePlayer.resetHand()
    activePlayer.setHand([mockHighEnergyCard])

    expect(() =>
      mainPhase['moveCardFromHandToFrontLine'](0, 0),
    ).toThrowError(
      'The card does not meet the total energy requirement generated on the energyLine.',
    )
  })

  it('HAND_TO_FRONTLINE should calculate the totalEnergy', () => {
    const reduceSpy = jest.spyOn(Array.prototype, 'reduce')

    mainPhase['moveCardFromHandToFrontLine'](0, 0)

    expect(reduceSpy).toHaveBeenCalled()
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

  it('moveCardFromHandToEnergyLine should throw an error when no card exists in the players hand', () => {
    const { activePlayer } = gameState

    activePlayer.resetHand()

    expect(() =>
      mainPhase['moveCardFromHandToEnergyLine'](0, 0),
    ).toThrowError(
      'No card exists in the players hand with the specified index.',
    )
  })

  it('moveCardFromHandToEnergyLine should throw an error when the position is occupied', () => {
    const { activePlayer } = gameState

    gameState.setBoardProperty(activePlayer.id, 'energyLine', [
      mockCard,
    ])
    activePlayer.resetHand()
    activePlayer.setHand([mockCard])

    expect(() =>
      mainPhase['moveCardFromHandToEnergyLine'](0, 0),
    ).toThrowError(
      'The specified energyLine position is already occupied.',
    )
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

  it('should throw an error when there is no action points to consume', () => {
    const { activePlayer } = gameState

    const card = mockActionCard

    card.rest()

    gameState.setBoardProperty(activePlayer.id, 'actionPointsLine', [
      card,
    ])

    expect(() => mainPhase['useActionPoint']()).toThrowError(
      'No available action points to consume.',
    )
  })
})
