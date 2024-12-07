import { describe, it, expect } from "@jest/globals";
import { TurnManager } from "../../../engine/core/TurnManager";
import { Card } from "../../../engine/components/Card";
import { CardType, Card as Cards } from "../../../types";
import { GameState } from "../../../engine/core/GameState";
import { Player } from "../../../engine/components/Player";
import { ActionPointCard } from "../../../engine/components/ActionPointCard";
import { ActionPointCard as ActionPointCardType } from "../../../types";
import fs from "fs/promises";
import { join } from "path";
import { FormattedCard } from "../../../types";

const directoryPath = "../api/src/cards";
const fileName = "card.json";

const getDirectories = async (): Promise<string[]> => {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(directoryPath, entry.name));
};

const getFile = async (path: string): Promise<string | null> => {
  const files = await fs.readdir(path);

  for (const file of files) {
    if (file === fileName) {
      return join(path, file);
    }
  }
  return null;
};

const readCardFile = async (filePath: string): Promise<FormattedCard> => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as FormattedCard;
};

it("should handle raiding a card correctly", async () => {
  // Create mock cards
  const raidingCard = new Card(
    "Raider",
    "raid%<Target Card>", // Effect data format for raid
    "character",
    "None",
    "None",
    "None",
    "None",
    "Raid",
    "None",
    0,
    true
  );

  const targetCard = new Card(
    "Target Card",
    "some effect",
    "character",
    "None",
    "None",
    "None",
    "None",
    "None",
    "None",
    0,
    true
  );

  const directories = await getDirectories();
  const cards: Cards[] = [];

  for (let i = 0; i < directories.length; i++) {
    const filePath = await getFile(directories[i]);

    if (filePath) {
      const card = await readCardFile(filePath);
      const newCard = new Card(
        card.name,
        card.effectData ?? "",
        card.categoryData as CardType,
        "None",
        "None",
        "None",
        "None",
        "None",
        "None",
        1,
        false
      );

      cards.push(newCard);
    }
  }

  const playerOneActionPointCards: ActionPointCardType[] = [];
  const playerTwoActionPointCards: ActionPointCardType[] = [];

  for (let i = 0; i < 2; i++) {
    playerOneActionPointCards.push(new ActionPointCard(`actionPointCard${i}`));
    playerTwoActionPointCards.push(new ActionPointCard(`actionPointCard${i}`));
  }

  // Set up mock game state
  const mockPlayerOne = new Player(
    "Player One",
    [...cards],
    [...playerOneActionPointCards]
  );

  const mockPlayerTwo = new Player(
    "Player Two",
    [...cards],
    [...playerTwoActionPointCards]
  );

  const mockBoard = {
    frontLine: [null, targetCard, null],
    energyLine: [targetCard, null, null],
    actionPointsLine: [null, null, null],
  };

  const mockGameState = new GameState([mockPlayerOne, mockPlayerTwo]);
  mockGameState.initialize();
  const turnManager = new TurnManager(mockGameState);

  mockGameState.board.set(mockPlayerOne.id, {
    frontLine: new Array(4).fill(targetCard),
    energyLine: new Array(4).fill(targetCard),
    actionPointsLine: mockPlayerOne.actionPoints,
  });

  // Execute raid during main phase
  turnManager.nextPhase(); // Start -> Main
  console.log(mockBoard.frontLine);
  turnManager.handleMainPhase(0); // Pass index of raiding card in hand
  console.log(mockBoard.frontLine);

  //console.log(mockGameState.getActivePlayer());

  // Verify raid results
  expect(mockBoard.frontLine).toContain(raidingCard); // Raiding card should be in front line
  expect(mockBoard.energyLine[0]).toBeNull(); // Target should be removed from energy line
  expect(mockPlayerOne.hand).not.toContain(raidingCard); // Raiding card should be removed from hand
});
