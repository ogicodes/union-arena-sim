import {
  test,
  describe,
  it,
  afterEach,
  beforeEach,
} from '@jest/globals'
import { Player } from '../../../src/engine/components/Player'
import type {
  Player as PlayerType,
  Card as CardType,
  ActionPointCard as ActionPointCardType,
} from '../../../src/types'
import {
  mockDeckCardData,
  mockActionCardData,
} from '../../fixtures/card-fixture'
import { Card } from '../../../src/engine/components/Card'
import { ActionPointCard } from '../../../src/engine/components/ActionPointCard'

describe('Player', () => {
  let player: PlayerType
  let mockCard: CardType
  let mockApCard: ActionPointCardType

  const mockPlayerData = {
    name: 'mock-player',
  }

  beforeEach(done => {
    let deck: CardType[] = []
    let apCards: ActionPointCardType[] = []

    mockCard = new Card(
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
      deck.push(mockCard)
    }

    mockApCard = new ActionPointCard(mockActionCardData.name)
    for (let i = 0; i < 3; i++) {
      apCards.push(mockApCard)
    }
    player = new Player(mockPlayerData.name, deck, apCards)
    done()
  })

  afterEach(done => {
    done()
  })

  it('Should create a player', () => {
    expect(player.id).toBeDefined()
    expect(player.deck).toHaveLength(50)
    expect(player.hand).toHaveLength(0)
    expect(player.actionPoints).toHaveLength(3)
  })

  test('getActionPointCard', done => {
    const card = player.drawActionPointCard()
    expect(card).toBeDefined()
    expect(player.actionPoints).toHaveLength(2)
    done()
  })
})
