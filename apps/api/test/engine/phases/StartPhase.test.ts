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
    const mockActionCardCollectionOne: ActionPointCardType[] = []
    const mockActionCardCollectionTwo: ActionPointCardType[] = []

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

  it('should unrest the AP cards', () => {
    const { activePlayer } = gameState
    const { actionPointsLine } = gameState.getBoard(activePlayer.id)

    actionPointsLine.forEach(card => {
      const mockRestMethod = jest.spyOn(card, 'rest')
      if (card.data.state.isRested) {
        expect(mockRestMethod).toHaveBeenCalled()
      }
      expect(card.data.state.isRested).toBeFalsy()
    })
  })
})
