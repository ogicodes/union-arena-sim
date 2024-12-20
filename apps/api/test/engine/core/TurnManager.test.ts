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

describe('TurnManager', () => {
  let turnManager: TurnManagerType
  let gameState: GameStateType

  beforeEach(done => {
    const playerOneDeck: CardType[] = []
    const playerTwoDeck: CardType[] = []
    const actionPointCollection: ActionPointCardType[] = []

    const actionPointCard = new ActionPointCard(
      mockActionCardData.name,
    )

    for (let i = 0; i < 3; i++) {
      actionPointCollection.push(actionPointCard)
    }

    const mockCard = new Card(
      mockDeckCardData.name,
      mockDeckCardData.effectData,
      mockDeckCardData.cardType,
      mockDeckCardData.trigger,
      mockDeckCardData.triggerEffect,
      mockDeckCardData.keyword,
      mockDeckCardData.keywordAbility,
      mockDeckCardData.activationTimingAbility,
      mockDeckCardData.activationCondition,
      mockDeckCardData.apCost,
      mockDeckCardData.isRaidable,
      mockDeckCardData.color,
      mockDeckCardData.bpData,
      mockDeckCardData.attributeData,
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
      actionPointCollection,
    )
    const playerTwo = new Player(
      'player-two',
      playerTwoDeck,
      actionPointCollection,
    )
    gameState = new GameState([playerOne, playerTwo])

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
    expect(gameState.currentPhaseIdx).toBe(0)
  })
})
