import {
  describe,
  expect,
  it,
  beforeEach,
  afterEach,
} from '@jest/globals'
import { StartPhase } from '../../../src/engine/phases'
import { GameState } from '../../../src/engine/core/GameState'
import { Card } from '../../../src/engine/components/Card'
import { Player } from '../../../src/engine/components/Player'
import { ActionPointCard } from '../../../src/engine/components/ActionPointCard'
import type {
  Phase,
  GameState as GameStateType,
  ActionPointCard as ActionPointCardType,
  Card as CardType,
} from '../../../src/types'
import {
  mockActionCardData,
  mockDeckCardData,
} from '../../fixtures/card-fixture'

describe('StartPhase', () => {
  let startPhase: Phase
  let gameState: GameStateType

  beforeEach(done => {
    const mockPlayerDeck: CardType[] = []
    const mockActionCardCollection: ActionPointCardType[] = []

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

    const mockActionCard = new ActionPointCard(
      mockActionCardData.name,
    )

    for (let i = 0; i < 50; i++) {
      mockPlayerDeck.push(mockCard)
    }

    for (let i = 0; i < 3; i++) {
      mockActionCardCollection.push(mockActionCard)
    }

    const mockPlayerOne = new Player(
      'player-one',
      mockPlayerDeck,
      mockActionCardCollection,
    )
    const mockPlayerTwo = new Player(
      'player-two',
      mockPlayerDeck,
      mockActionCardCollection,
    )

    gameState = new GameState([mockPlayerOne, mockPlayerTwo])

    startPhase = new StartPhase(gameState)
    done()
  })

  afterEach(done => {
    done()
  })

  it('should initialize correctly', () => {
    const mockExecute = jest.spyOn(startPhase, 'execute')

    startPhase.execute()

    expect(mockExecute).toHaveBeenCalled()
    expect(startPhase.name).toBe('Start Phase')
  })
})
