import {
  describe,
  expect,
  it,
  beforeEach,
  afterEach,
} from '@jest/globals'
import { Card } from '../../../src/engine/components/Card'
import type { Card as CardType } from '../../../src/types'
import { mockDeckCardData } from '../../fixtures/card-fixture'

describe('Card', () => {
  let card: CardType

  beforeEach(done => {
    card = new Card(
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
    done()
  })

  afterEach(done => {
    done()
  })

  it('initializes properly', () => {
    expect(card.data.name).toBeDefined()
    expect(card.data.abilities.effectData).toBeDefined()
    expect(card.data.cardType).toBeDefined()
    expect(card.data.abilities.trigger).toBeDefined()
    expect(card.data.abilities.triggerEffect).toBeDefined()
    expect(card.data.abilities.keyword).toBeDefined()
    expect(card.data.abilities.keywordAbility).toBeDefined()
    expect(card.data.abilities.activationTimingAbility).toBeDefined()
    expect(card.data.abilities.activationCondition).toBeDefined()
    expect(card.data.costs.apCost).toBeDefined()
    expect(card.data.isRaidable).toBeDefined()
    expect(card.data.color).toBeDefined()
    expect(card.data.bpData).toBeDefined()
    expect(card.data.attributeData).toBeDefined()
    expect(card.data.costs.needEnergyData).toBeDefined()
    expect(card.data.costs.generatedEnergyData).toBeDefined()
  })
})
