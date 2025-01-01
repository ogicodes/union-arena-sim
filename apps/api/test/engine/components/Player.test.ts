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
import { mockPlayerData } from '../../fixtures/player-fixture'
import { Card } from '../../../src/engine/components/Card'
import { ActionPointCard } from '../../../src/engine/components/ActionPointCard'

describe('Player', () => {
  let player: PlayerType
  let mockCard: CardType
  let mockApCard: ActionPointCardType

  beforeEach(done => {
    const deck: CardType[] = []
    const apCards: ActionPointCardType[] = []

    mockCard = new Card(
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

  it('gets the turn count', () => {
    expect(player.turnCount).toBe(1)
  })

  it('returns the correct player name', () => {
    expect(player.name).toBe(mockPlayerData.name)
  })

  it('draws a card from the players deck', () => {
    const mockDrawMethod = jest.spyOn(player, 'drawCard')

    const card = player.drawCard()

    expect(mockDrawMethod).toHaveBeenCalled()
    expect(player.deck).toHaveLength(49)
    expect(card).toBeDefined()
  })

  it('logs a message when attempting to draw more cards than available', () => {
    const mockDrawMethod = jest.spyOn(player, 'drawCard')
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

    for (let i = 0; i < 51; i++) {
      const card = player.drawCard()
      if (i < 50) {
        expect(card).toBeDefined()
      } else {
        expect(card).toBeNull()
      }
    }

    expect(mockDrawMethod).toHaveBeenCalledTimes(51)
    expect(consoleSpy).toHaveBeenCalledWith('no cards left')

    consoleSpy.mockRestore()
    mockDrawMethod.mockRestore()
  })

  it('successfully draws an action point card', () => {
    const mockAPDrawMethod = jest.spyOn(player, 'drawActionPointCard')

    const card = player.drawActionPointCard()

    expect(mockAPDrawMethod).toHaveBeenCalledTimes(1)
    expect(card).toBeDefined()

    mockAPDrawMethod.mockRestore()
  })

  it('throws an error when more action point cards are drawn than available', () => {
    const mockAPDrawMethod = jest.spyOn(player, 'drawActionPointCard')

    for (let i = 0; i < 4; i++) {
      if (i < 3) {
        const card = player.drawActionPointCard()
        expect(card).toBeDefined()
      } else {
        expect(() => player.drawActionPointCard()).toThrow(
          'No AP card available.',
        )
      }
    }

    expect(mockAPDrawMethod).toHaveBeenCalledTimes(4)

    mockAPDrawMethod.mockRestore()
  })

  it('plucks a card from the players hand', () => {
    for (let i = 0; i < 7; i++) {
      player.addToHand(mockCard)
    }

    const pluckMethod = jest.spyOn(player, 'pluck')

    const card = player.pluck(1)

    expect(card).toBeDefined()
    expect(pluckMethod).toHaveBeenCalledWith(1)
    expect(player.hand).toHaveLength(6)
  })
})
