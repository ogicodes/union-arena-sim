import { getDirectories, getFile, readCardFile } from "../utils/file-helpers";
import { createCard } from "../utils/card-factory";
import { Card } from "../engine/components/Card";
import { ActionPointCard } from "../engine/components/ActionPointCard";
import { GameEngine } from "../engine/core/GameEngine";
import { Player } from "../engine/components/Player";
import type {
  FormattedCard,
  ActionPointCard as ActionPointCardType,
} from "../types";

const initializePlayers = async (): Promise<Player[]> => {
  const directories = await getDirectories();
  const cards: Card[] = [];

  // Load all cards from directories
  for (const directory of directories) {
    const filePath = await getFile(directory);

    if (filePath) {
      const cardData = (await readCardFile(filePath)) as FormattedCard;
      const newCard = createCard(cardData);
      cards.push(newCard);
    }
  }

  // Create Action Point Cards for each player
  const createActionPointCards = (count: number): ActionPointCardType[] => {
    return Array.from(
      { length: count },
      (_, index) => new ActionPointCard(`actionPointCard${index}`)
    );
  };

  const playerOneActionPointCards = createActionPointCards(2);
  const playerTwoActionPointCards = createActionPointCards(2);

  // Initialize Players
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

  return [playerOne, playerTwo];
};

const main = async () => {
  // Initialize players
  const players = await initializePlayers();

  // Initialize the game engine
  const game = new GameEngine(players);

  // Start the game
  game.startGame();
};

main().catch((error) => console.error("Error starting the game:", error));
