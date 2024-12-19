import {
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
} from '@jest/globals'
import { GameState } from '../../../src/engine/core/GameState'
import { Player } from '../../../src/engine/components/Player'
import { Card } from '../../../src/engine/components/Card'
import { ActionPointCard } from '../../../src/engine/components/ActionPointCard'
import {
  mockActionCardData,
  mockDeckCardData,
} from '../../fixtures/card-fixture'

describe('GameState', () => {
  let gameState: GameState
  let playerOne: Player, playerTwo: Player
  let actionPointCard: ActionPointCard, mockCard: Card

  beforeEach(done => {
    /** create a mock card */
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
    actionPointCard = new ActionPointCard(mockActionCardData.name)

    /** create the player decks */
    const playerOneDeck: Card[] = []
    const playerTwoDeck: Card[] = []
    for (let i = 0; i < 50; i++) {
      playerOneDeck.push(mockCard)
      playerTwoDeck.push(mockCard)
    }

    /** give each player action points */
    const playerOneActionPoints: ActionPointCard[] = []
    const playerTwoActionPoints: ActionPointCard[] = []
    for (let i = 0; i < 3; i++) {
      playerOneActionPoints.push(actionPointCard)
      playerTwoActionPoints.push(actionPointCard)
    }

    playerOne = new Player(
      'player 1',
      playerOneDeck,
      playerOneActionPoints,
    )
    playerTwo = new Player(
      'player 2',
      playerTwoDeck,
      playerTwoActionPoints,
    )

    gameState = new GameState([playerOne, playerTwo])
    done()
  })

  afterEach(done => {
    done()
  })

  it('should initialize correctly', done => {
    gameState.initialize()

    const expectedPlayerOneBoard = {
      frontLine: [],
      energyLine: [],
      actionPointsLine: [
        actionPointCard,
        actionPointCard,
        actionPointCard,
      ],
      sideline: [],
      removalArea: [],
      lifePoints: [
        mockCard,
        mockCard,
        mockCard,
        mockCard,
        mockCard,
        mockCard,
        mockCard,
      ],
    }

    const expectedPlayerTwoBoard = {
      frontLine: [],
      energyLine: [],
      actionPointsLine: [
        actionPointCard,
        actionPointCard,
        actionPointCard,
      ],
      sideline: [],
      removalArea: [],
      lifePoints: [
        mockCard,
        mockCard,
        mockCard,
        mockCard,
        mockCard,
        mockCard,
        mockCard,
      ],
    }

    /** gamestate is false */
    expect(gameState.gameOver).toBe(false)

    /** two players per game */
    expect(gameState.players).toHaveLength(2)

    /** players decks have decreased by 14 */
    expect(playerOne.deck.length).toBe(36)
    expect(playerTwo.deck.length).toBe(36)

    /** players should have no AP Cards */
    expect(playerOne.actionPoints.length).toBe(0)
    expect(playerTwo.actionPoints.length).toBe(0)

    /** gameboard should match */
    expect(gameState.board.get(playerOne.id)).toEqual(
      expectedPlayerOneBoard,
    )
    expect(gameState.board.get(playerTwo.id)).toEqual(
      expectedPlayerTwoBoard,
    )

    done()
  })
})
