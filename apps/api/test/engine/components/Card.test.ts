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
      mockDeckCardData.triggerData,
      mockDeckCardData.apCost,
      mockDeckCardData.color,
      mockDeckCardData.bpData,
      mockDeckCardData.needEnergyData,
      mockDeckCardData.generatedEnergyData,
    )
    done()
  })

  afterEach(done => {
    done()
  })

  it('initializes properly', () => {
    expect(card).toBeDefined()
  })

  it('gets rested', () => {
    const restMockMethod = jest.spyOn(card, 'rest')

    card.rest()

    expect(restMockMethod).toHaveBeenCalled()
    expect(card.data.state.isRested).toBeFalsy()
  })

  it('gets flipped', () => {
    const flipMockMethod = jest.spyOn(card, 'flip')

    card.flip()

    expect(flipMockMethod).toHaveBeenCalled()
    expect(card.data.state.isFaceUp).toBeTruthy()
  })
})
