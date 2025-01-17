import {
  describe,
  expect,
  it,
  beforeEach,
  afterEach,
  jest,
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
  let mockPlayerOne: Player
  let mockPlayerTwo: Player

  beforeEach(done => {
    const mockPlayerOneDeck: CardType[] = []
    const mockPlayerTwoDeck: CardType[] = []
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
      mockPlayerOneDeck.push(mockCard)
      mockPlayerTwoDeck.push(mockCard)
    }

    for (let i = 0; i < 3; i++) {
      mockActionCardCollectionOne.push(mockActionCard)
      mockActionCardCollectionTwo.push(mockActionCard)
    }

    mockPlayerOne = new Player(
      'player-one',
      mockPlayerOneDeck,
      mockActionCardCollectionOne,
    )
    mockPlayerTwo = new Player(
      'player-two',
      mockPlayerTwoDeck,
      mockActionCardCollectionTwo,
    )
    mockPlayerOne.setState(
      'id',
      '9fa57804-b1d9-4d80-9f1f-a413c6d0f764',
    )
    mockPlayerTwo.setState(
      'id',
      '34fa15d9-ffa0-4ea8-b927-95df15001b7c',
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

    const mockAPCardOne = new ActionPointCard('mock-ap-one')
    const mockAPCardTwo = new ActionPointCard('mock-ap-two')
    const mockAPCardThree = new ActionPointCard('mock-ap-three')

    gameState.setBoardProperty(activePlayer.id, 'actionPointsLine', [
      mockAPCardOne,
      mockAPCardTwo,
      mockAPCardThree,
    ])

    for (let i = 0; i < actionPointsLine.length; i++) {
      const restSpy = jest.spyOn(actionPointsLine[i], 'rest')
      actionPointsLine[i].rest()
      expect(restSpy).toHaveBeenCalled()
    }

    startPhase.execute()
  })

  it('should draw a card', () => {
    gameState.setState('turnCount', 2)

    startPhase.execute()

    expect(gameState.activePlayer.hand).toHaveLength(8)
  })

  it('should end the game if there are no cards to draw', () => {
    const endGameSpy = jest.spyOn(gameState, 'endGame')
    gameState.setState('turnCount', 2)
    gameState.activePlayer.setState('deck', [])

    startPhase.execute()

    expect(endGameSpy).toHaveBeenCalled()
  })

  it('should handle the flipping of action point cards', () => {
    const { activePlayer } = gameState
    const executeSpy = jest.spyOn(startPhase, 'execute')

    gameState.setState('turnCount', 1)

    const mockAPCardOne = new ActionPointCard('mock-ap-one')
    const mockAPCardTwo = new ActionPointCard('mock-ap-two')
    const mockAPCardThree = new ActionPointCard('mock-ap-three')

    gameState.setBoardProperty(activePlayer.id, 'actionPointsLine', [
      mockAPCardOne,
      mockAPCardTwo,
      mockAPCardThree,
    ])

    startPhase.execute()

    /**-------------------------------------------------
     * Turn count = 1, active player = 0
     * -------------------------------------------------*/
    expect(gameState.turnCount).toBe(1)
    expect(activePlayer.id).toBe(gameState.players[0].id)
    expect(executeSpy).toHaveBeenCalled()
    expect(
      gameState.getBoard(activePlayer.id).actionPointsLine[0][
        '_isFaceUp'
      ],
    ).toBeTruthy()
    expect(
      gameState.getBoard(activePlayer.id).actionPointsLine[1][
        '_isFaceUp'
      ],
    ).toBeFalsy()
    expect(
      gameState.getBoard(activePlayer.id).actionPointsLine[2][
        '_isFaceUp'
      ],
    ).toBeFalsy()
    mockAPCardOne.flip()

    /**-------------------------------------------------
     * Turn count = 2, active player = 0
     * -------------------------------------------------*/
    gameState.setState('turnCount', 2)

    gameState.setBoardProperty(activePlayer.id, 'actionPointsLine', [
      mockAPCardOne,
      mockAPCardTwo,
      mockAPCardThree,
    ])

    startPhase.execute()

    expect(gameState.turnCount).toBe(2)
    expect(activePlayer.id).toBe(gameState.players[0].id)
    expect(executeSpy).toHaveBeenCalledTimes(2)
    expect(
      gameState.getBoard(activePlayer.id).actionPointsLine[0][
        '_isFaceUp'
      ],
    ).toBeTruthy()
    expect(
      gameState.getBoard(activePlayer.id).actionPointsLine[1][
        '_isFaceUp'
      ],
    ).toBeTruthy()
    expect(
      gameState.getBoard(activePlayer.id).actionPointsLine[2][
        '_isFaceUp'
      ],
    ).toBeFalsy()
    mockAPCardOne.flip()
    mockAPCardTwo.flip()

    /**-------------------------------------------------
     * Turn count = 3, active player = 0
     * -------------------------------------------------*/
    gameState.setState('turnCount', 3)

    gameState.setBoardProperty(activePlayer.id, 'actionPointsLine', [
      mockAPCardOne,
      mockAPCardTwo,
      mockAPCardThree,
    ])

    startPhase.execute()

    expect(gameState.turnCount).toBe(3)
    expect(activePlayer.id).toBe(gameState.players[0].id)
    expect(executeSpy).toHaveBeenCalledTimes(3)
    expect(
      gameState.getBoard(activePlayer.id).actionPointsLine[0][
        '_isFaceUp'
      ],
    ).toBeTruthy()
    expect(
      gameState.getBoard(activePlayer.id).actionPointsLine[1][
        '_isFaceUp'
      ],
    ).toBeTruthy()
    expect(
      gameState.getBoard(activePlayer.id).actionPointsLine[2][
        '_isFaceUp'
      ],
    ).toBeTruthy()
    mockAPCardOne.flip()
    mockAPCardTwo.flip()
    mockAPCardThree.flip()

    /**-------------------------------------------------
     * Turn count = 2, active player = 1
     * -------------------------------------------------*/
    gameState.setState('turnCount', 2)
    gameState.setState('activePlayerIndex', 1)

    gameState.setBoardProperty(
      gameState.activePlayer.id,
      'actionPointsLine',
      [mockAPCardOne, mockAPCardTwo, mockAPCardThree],
    )

    startPhase.execute()

    expect(gameState.turnCount).toBe(2)
    expect(gameState.activePlayer.id).toBe(gameState.players[1].id)
    expect(executeSpy).toHaveBeenCalledTimes(4)
    expect(
      gameState.getBoard(activePlayer.id).actionPointsLine[0][
        '_isFaceUp'
      ],
    ).toBeTruthy()
    expect(
      gameState.getBoard(activePlayer.id).actionPointsLine[1][
        '_isFaceUp'
      ],
    ).toBeTruthy()
    expect(
      gameState.getBoard(activePlayer.id).actionPointsLine[2][
        '_isFaceUp'
      ],
    ).toBeFalsy()
    mockAPCardOne.flip()
    mockAPCardTwo.flip()

    /**-------------------------------------------------
     * Turn count = 3, active player = 1
     * -------------------------------------------------*/
    gameState.setState('turnCount', 3)
    gameState.setState('activePlayerIndex', 1)

    gameState.setBoardProperty(
      gameState.activePlayer.id,
      'actionPointsLine',
      [mockAPCardOne, mockAPCardTwo, mockAPCardThree],
    )

    startPhase.execute()

    expect(gameState.turnCount).toBe(3)
    expect(gameState.activePlayer.id).toBe(gameState.players[1].id)
    expect(executeSpy).toHaveBeenCalledTimes(5)
    expect(
      gameState.getBoard(activePlayer.id).actionPointsLine[0][
        '_isFaceUp'
      ],
    ).toBeTruthy()
    expect(
      gameState.getBoard(activePlayer.id).actionPointsLine[1][
        '_isFaceUp'
      ],
    ).toBeTruthy()
    expect(
      gameState.getBoard(activePlayer.id).actionPointsLine[2][
        '_isFaceUp'
      ],
    ).toBeTruthy()
    mockAPCardOne.flip()
    mockAPCardTwo.flip()
    mockAPCardThree.flip()

    /**-------------------------------------------------
     * Turn count = 4, active player = ~
     * -------------------------------------------------*/
    gameState.setState('turnCount', 4)
    gameState.setState('activePlayerIndex', 0)

    startPhase.execute()

    expect(executeSpy).toHaveBeenCalledTimes(6)
    expect(executeSpy).toHaveReturned()
  })
})
