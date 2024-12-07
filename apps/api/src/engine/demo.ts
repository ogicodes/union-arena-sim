import type {
  FormattedCard,
  Card as Cards,
  CardType,
  ActionPointCard as ActionPointCardType,
} from "../types";
import { Card } from "./components/Card";
import { ActionPointCard } from "./components/ActionPointCard";
import { GameEngine } from "./core/GameEngine";
import { Player } from "./components/Player";
import fs from "fs/promises";
import { join } from "path";

const directoryPath = "../cards";
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

const main = async () => {
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

  const playerOne = new Player(
    "Player One",
    [...cards],
    [...playerOneActionPointCards]
  );
  const playerTwo = new Player(
    "Player Two",
    [...cards],
    [...playerTwoActionPointCards]
  );

  const game = new GameEngine([playerOne, playerTwo]);

  game.startGame();
};

main();
