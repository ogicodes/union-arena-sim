import {
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
} from '@jest/globals'
import { ActionPointCard } from '../../../src/engine/components/ActionPointCard'
import type { ActionPointCard as ActionPointCardType } from '../../../src/types'
import { mockActionCardData } from '../../fixtures/card-fixture'

describe('ActionPointCard', () => {
  let apCard: ActionPointCardType

  beforeEach(done => {
    apCard = new ActionPointCard(mockActionCardData.name)
    done()
  })

  afterEach(done => {
    done()
  })

  it('initializes a card correctly', () => {
    expect(apCard.name).toBe(mockActionCardData.name)
    expect(apCard.isFaceUp).toBeFalsy()
    expect(apCard.isRested).toBeFalsy()
    expect(apCard.id).toBeDefined()
  })
})
