import {
  describe,
  expect,
  it,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals'
import { MovementPhase } from '../../../src/engine/phases'
import { GameState } from '../../../src/engine/core/GameState'
import { Card } from '../../../src/engine/components/Card'
import { Player } from '../../../src/engine/components/Player'
import { ActionPointCard } from '../../../src/engine/components/ActionPointCard'
import type {
  GameState as GameStateType,
  ActionPointCard as ActionPointCardType,
  Card as CardType,
} from '../../../src/types'
import {
  mockActionCardData,
  mockDeckCardData,
} from '../../fixtures/card-fixture'

describe('MovementPhase', () => {
  let movementPhase: InstanceType<typeof MovementPhase>
  let gameState: GameStateType

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

    const mockPlayerOne = new Player(
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

    gameState.setPhase(1)

    movementPhase = new MovementPhase(gameState)
    done()
  })

  afterEach(done => {
    done()
  })

  it('should initialize', () => {
    expect(movementPhase.name).toBe('Movement Phase')
  })

  it('should call execute', () => {
    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {})
    const executeSpy = jest.spyOn(movementPhase, 'execute')

    movementPhase.execute()

    expect(executeSpy).toHaveBeenCalled()
    expect(consoleSpy).toHaveBeenCalledWith(
      `Movement Phase: ${gameState.activePlayer.id}`,
    )
  })

  it('should route the movement correctly', () => {
    const movementSpy = jest.spyOn(movementPhase, 'movement')
    const moveFrontLineToEnergyLineSpy = jest
      .spyOn(movementPhase as any, 'moveFrontLineToEnergyLine') // eslint-disable-line
      .mockImplementation(() => {})
    const moveEnergyLineToFrontLineSpy = jest
      .spyOn(movementPhase as any, 'moveEnergyLineToFrontLine') // eslint-disable-line
      .mockImplementation(() => {})

    movementPhase.movement('FRONTLINE_TO_ENERGYLINE', 0, 0)
    expect(moveFrontLineToEnergyLineSpy).toHaveBeenCalled()

    movementPhase.movement('ENERGYLINE_TO_FRONTLINE', 0, 0)
    expect(moveEnergyLineToFrontLineSpy).toHaveBeenCalled()

    expect(movementSpy).toHaveBeenCalledTimes(2)
  })

  it('moveFrontLineToEnergyLine() should throw an error if no card exists at the specified energyLine index', () => {
    expect(() =>
      movementPhase.movement('FRONTLINE_TO_ENERGYLINE', 0, 0),
    ).toThrowError(
      'No card exists at the specified energyLine index.',
    )
  })

  it('moveFrontLineToEnergyLine() should throw an error if the position is already occupied', () => {
    const { activePlayer } = gameState

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

    gameState.setBoardProperty(activePlayer.id, 'energyLine', [
      mockCard,
    ])
    gameState.setBoardProperty(activePlayer.id, 'frontLine', [
      mockCard,
    ])

    expect(() => {
      movementPhase.movement('FRONTLINE_TO_ENERGYLINE', 0, 0)
    }).toThrowError(
      'The specified energyLine position is already occupied.',
    )
  })

  it('moveFrontLineToEnergyLine() should insert the card from the frontLine to the energyLine', () => {
    const movementSpy = jest.spyOn(movementPhase, 'movement')
    const { activePlayer } = gameState

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

    gameState.setBoardProperty(activePlayer.id, 'frontLine', [
      mockCard,
    ])

    movementPhase.movement('FRONTLINE_TO_ENERGYLINE', 0, 0)

    expect(movementSpy).toHaveBeenCalled()
    expect(
      gameState.getBoard(activePlayer.id).energyLine[0],
    ).toBeInstanceOf(Card)
  })

  it('moveEnergyLineToFrontLine() should throw an error if no card exists at the specified energyLine', () => {
    expect(() =>
      movementPhase.movement('ENERGYLINE_TO_FRONTLINE', 0, 0),
    ).toThrowError(
      'No card exists at the specified energyLine index.',
    )
  })

  it('moveEnergyLineToFrontLine() should throw an error if the position is occupied', () => {
    const { activePlayer } = gameState

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

    gameState.setBoardProperty(activePlayer.id, 'frontLine', [
      mockCard,
    ])
    gameState.setBoardProperty(activePlayer.id, 'energyLine', [
      mockCard,
    ])

    expect(() =>
      movementPhase.movement('ENERGYLINE_TO_FRONTLINE', 0, 0),
    ).toThrowError(
      'The specified frontLine position is already occupied.',
    )
  })

  it('moveEnergyLineToFrontLine() should insert the card from the energyLine to the frontLine', () => {
    const movementSpy = jest.spyOn(movementPhase, 'movement')
    const { activePlayer } = gameState

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

    gameState.setBoardProperty(activePlayer.id, 'energyLine', [
      mockCard,
    ])

    movementPhase.movement('ENERGYLINE_TO_FRONTLINE', 0, 0)

    expect(movementSpy).toHaveBeenCalled()
    expect(
      gameState.getBoard(activePlayer.id).frontLine[0],
    ).toBeInstanceOf(Card)
  })
})
