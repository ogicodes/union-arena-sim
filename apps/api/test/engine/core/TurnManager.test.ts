import { GameState } from "../../../src/engine/core/GameState";
import { TurnManager } from "../../../src/engine/core/TurnManager";
import { Player } from "../../../src/engine/components/Player";
import { Card } from "../../../src/engine/components/Card";
import { describe, it, expect } from "@jest/globals";

describe("TurnManager - Attack Phase with Triggers", () => {
  it("should activate a trigger when a life card is flipped", () => {
    const createMockDeck = (size: number, triggerCard?: Card): Card[] => {
      const deck = Array.from({ length: size }, (_, i) => {
        return new Card(
          `Card ${i + 1}`,
          "Generated card for testing",
          "character",
          "None",
          "None",
          "None",
          "None",
          [],
          "None",
          1,
          true,
          "blue",
          1000,
          "None",
          1,
          1
        );
      });

      if (triggerCard) {
        deck[6] = triggerCard;
      }

      return deck;
    };

    const mockTriggerCard = new Card(
      "Trigger Card",
      "Effect description",
      "character",
      "Draw",
      "Draw 1 Card.",
      "None",
      "None",
      [],
      "None",
      1,
      true,
      "blue",
      1000,
      "None",
      1,
      1
    );

    const playerOneDeck = createMockDeck(50);
    const playerTwoDeck = createMockDeck(50, mockTriggerCard);

    const playerOne = new Player("Player One", playerOneDeck, []);
    playerOne.id = "playerOne";

    const playerTwo = new Player("Player Two", playerTwoDeck, []);
    playerTwo.id = "playerTwo";

    const gameState = new GameState([playerOne, playerTwo]);

    // Skip initialization
    // gameState.initialize();  // Comment this out

    // Set up the board manually
    gameState.board.set(playerOne.id, {
      frontLine: Array(5).fill(null),
      energyLine: Array(5).fill(null),
      actionPointsLine: [],
    });

    gameState.board.set(playerTwo.id, {
      frontLine: Array(5).fill(null),
      energyLine: Array(5).fill(null),
      actionPointsLine: [],
    });

    // Set life points manually
    playerTwo.lifePoints = []; // Clear first
    for (let i = 0; i < 7; i++) {
      playerTwo.lifePoints.push(
        i === 6
          ? mockTriggerCard
          : new Card(
              `Life Card ${i}`,
              "Effect description",
              "character",
              "None",
              "None",
              "None",
              "None",
              [],
              "None",
              1,
              true,
              "blue",
              1000,
              "None",
              1,
              1
            )
      );
    }

    const turnManager = new TurnManager(gameState);
    // Create and set up attacking card
    const attackingCard = new Card(
      "Attacking Card",
      "Effect description",
      "character",
      "None",
      "None",
      "None",
      "None",
      [],
      "None",
      1,
      true,
      "blue",
      1000,
      "None",
      1,
      1
    );
    attackingCard.isRested = false; // Ensure card is not rested
    gameState.getBoard(playerOne.id).frontLine[0] = attackingCard;

    // Initialize RemovalArea for playerTwo
    gameState.RemovalArea.set(playerTwo.id, []);

    turnManager.handleAttackPhase(0);

    expect(playerTwo.lifePoints.length).toBe(6);
    expect(playerOne.hand.length).toBe(1);
    expect(playerOne.hand[0].name).toBe("Trigger Card");
    expect(gameState.RemovalArea.get(playerTwo.id)?.length).toBe(1);
    expect(gameState.RemovalArea.get(playerTwo.id)?.[0].name).toBe(
      "Trigger Card"
    );
  });
});
