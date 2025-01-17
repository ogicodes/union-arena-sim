import { describe, it, afterEach, beforeEach } from '@jest/globals'
import { TurnManager } from '../../../src/engine/core/TurnManager'
import { GameState } from '../../../src/engine/core/GameState'
import { Player } from '../../../src/engine/components/Player'
import { Card } from '../../../src/engine/components/Card'
import { ActionPointCard } from '../../../src/engine/components/ActionPointCard'
import {
  mockDeckCardData,
  mockActionCardData,
} from '../../fixtures/card-fixture'
import type {
  Card as CardType,
  TurnManager as TurnManagerType,
  ActionPointCard as ActionPointCardType,
  GameState as GameStateType,
} from '../../../src/types'
import { StartPhase } from '../../../src/engine/phases'

describe('TurnManager', () => {
  let turnManager: TurnManagerType
  let gameState: GameStateType

  beforeEach(done => {
    const playerOneDeck: CardType[] = []
    const playerTwoDeck: CardType[] = []
    const actionPointCollectionOne: ActionPointCardType[] = []
    const actionPointCollectionTwo: ActionPointCardType[] = []

    const actionPointCard = new ActionPointCard(
      mockActionCardData.name,
    )

    for (let i = 0; i < 3; i++) {
      actionPointCollectionOne.push(actionPointCard)
      actionPointCollectionTwo.push(actionPointCard)
    }

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

    for (let i = 0; i < 50; i++) {
      playerOneDeck.push(mockCard)
      playerTwoDeck.push(mockCard)
    }

    const playerOne = new Player(
      'player-one',
      playerOneDeck,
      actionPointCollectionOne,
    )
    const playerTwo = new Player(
      'player-two',
      playerTwoDeck,
      actionPointCollectionTwo,
    )
    gameState = new GameState([playerOne, playerTwo])
    gameState.initialize()

    turnManager = new TurnManager(gameState)
    done()
  })

  afterEach(done => {
    done()
  })

  it('advances phases correctly', () => {
    const executePhaseMock = jest.spyOn(turnManager, 'executePhase')

    turnManager.executePhase()

    expect(executePhaseMock).toHaveBeenCalled()
    expect(gameState.currentPhaseIdx).toBe(1)
  })

  it('should get the current phase', () => {
    const currentPhase = turnManager.currentPhase
    expect(currentPhase).toBeInstanceOf(StartPhase)
  })

  it('should advance the phase', () => {
    const initialPhase = 0

    expect(gameState.currentPhaseIdx).toBe(initialPhase)

    turnManager.advancePhase()

    expect(gameState.currentPhaseIdx).toBe(initialPhase + 1)

    gameState.setState(
      'currentPhaseIdx',
      turnManager['_phases'].length - 1,
    )

    turnManager.advancePhase()

    expect(gameState.currentPhaseIdx).toBe(initialPhase)
  })
})
