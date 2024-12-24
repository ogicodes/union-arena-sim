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
  Movement,
  Phase,
  GameState as GameStateType,
  ActionPointCard as ActionPointCardType,
  Card as CardType,
} from '../../../src/types'
import {
  mockActionCardData,
  mockDeckCardData,
} from '../../fixtures/card-fixture'

describe('EndPhase', () => {
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

  it('should move a card from the active players hand to the frontline', () => {
    const { activePlayer } = gameState

    const movementSpy = jest.spyOn(movementPhase, 'movement')

    movementPhase.movement('HAND_TO_FRONTLINE', 1, 1)

    expect(movementSpy).toHaveBeenCalled()
    expect(activePlayer.hand).toHaveLength(6)
  })
})
