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
    expect(apCard.data.name).toBe(mockActionCardData.name)
    expect(apCard.data.state.isFaceUp).toBeFalsy()
    expect(apCard.data.state.isRested).toBeFalsy()
    expect(apCard.data.id).toBeDefined()
  })

  it('should flip', () => {
    const mockFlipMethod = jest.spyOn(apCard, 'flip')

    apCard.flip()

    expect(mockFlipMethod).toHaveBeenCalled()
    expect(apCard.data.state.isFaceUp).toBeTruthy()
  })

  it('should activate', () => {
    const mockRestMethod = jest.spyOn(apCard, 'rest')

    apCard.rest()

    expect(mockRestMethod).toHaveBeenCalled()
    expect(apCard.data.state.isRested).toBeTruthy()
  })
})
