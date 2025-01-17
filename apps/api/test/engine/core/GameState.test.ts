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
      mockDeckCardData.triggerData,
      mockDeckCardData.apCost,
      mockDeckCardData.color,
      mockDeckCardData.bpData,
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

  it('should throw an error if more than 2 players are added', () => {
    const playerOne = new Player('Player 1', [], [])
    const playerTwo = new Player('Player 2', [], [])
    const playerThree = new Player('Player 3', [], [])

    expect(() => {
      new GameState([playerOne, playerTwo, playerThree]).initialize()
    }).toThrow('A game cannot exceed more than 2 players.')
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
    expect(gameState.getBoard(playerOne.id)).toEqual(
      expectedPlayerOneBoard,
    )
    expect(gameState.getBoard(playerTwo.id)).toEqual(
      expectedPlayerTwoBoard,
    )
    done()
  })

  it('should log an error if there are no cards to draw for the lifepoints', () => {
    const { activePlayer } = gameState
    const gameStateInitSpy = jest.spyOn(gameState, 'initialize')
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    activePlayer.setState('deck', [])

    gameState.initialize()

    expect(gameStateInitSpy).toHaveBeenCalled()
    expect(consoleSpy).toHaveBeenCalledWith(
      'no cards to draw for the lifepoints.',
    )
  })

  it('should end the game', () => {
    const endGameMethod = jest.spyOn(gameState, 'endGame')
    gameState.endGame()
    expect(endGameMethod).toHaveBeenCalled()
    expect(gameState.gameOver).toBeTruthy()
  })

  it('should cycle to the next player after each turn', () => {
    const endTurnSpy = jest.spyOn(gameState, 'endTurn')

    expect(gameState.activePlayerIndex).toBe(0)

    gameState.endTurn()
    expect(gameState.activePlayerIndex).toBe(1)

    gameState.endTurn()
    expect(gameState.activePlayerIndex).toBe(0)

    expect(endTurnSpy).toHaveBeenCalled()
  })

  it('gets the active player', () => {
    const activePlayer = gameState.activePlayer
    expect(activePlayer).toBe(playerOne)
  })

  it('gets the inactive player', () => {
    const { inactivePlayer } = gameState
    expect(inactivePlayer).toBe(playerTwo)
  })

  it('should return the correct inactive player when active player is Player 2', () => {
    gameState.setState('activePlayerIndex', 1)
    const { inactivePlayer } = gameState
    expect(inactivePlayer).toBe(playerOne)
  })

  it('should return the first player when no inactive player is found', () => {
    gameState.setState('players', [playerOne, playerTwo])
    gameState.setState('activePlayerIndex', 0)
    const { inactivePlayer } = gameState
    expect(inactivePlayer).toBe(playerTwo)
  })
})
