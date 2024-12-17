import type {
  Player,
  Card as CardType,
  Phases,
  GameBoard,
  ActionPointCard,
} from "../../types";
import { Card } from "../components/Card";

export class GameState {
  players: Player[];
  activePlayerIndex: number;
  turnCount: number;
  phase: Phases;
  board: Map<
    string,
    {
      frontLine: Card[];
      energyLine: Card[];
      actionPointsLine: ActionPointCard[];
    }
  >;
  deck: Map<string, Card[]>;
  sideline: Map<string, Card[]>;
  RemovalArea: Map<string, Card[]>;
  gameOver: boolean;

  constructor(players: Player[]) {
    this.players = players;
    this.activePlayerIndex = 0;
    this.turnCount = 1;
    this.phase = "Start Phase";
    this.board = new Map();
    this.sideline = new Map();
    this.RemovalArea = new Map();
    this.deck = new Map();
    this.gameOver = false;

    // give the player a zone
    players.forEach((player) => {
      this.sideline.set(player.id, []);
      this.deck.set(player.id, player.deck);
    });
  }

  initialize(): void {
    this.players.forEach((player) => {
      // Ensure each player has at least 50 cards in their deck
      if (player.deck.length < 50) {
        for (let i = player.deck.length; i < 50; i++) {
          player.deck.push(
            new Card(
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
            )
          );
        }
      }

      this.board.set(player.id, {
        frontLine: new Array(4).fill(null),
        energyLine: new Array(4).fill(null),
        actionPointsLine: player.actionPoints,
      });

      this.sideline.set(player.id, []);
      this.RemovalArea.set(player.id, []);
      this.deck.set(player.id, [...player.deck]);

      // Modify this part to not set life points if they're already set
      if (player.lifePoints.length === 0) {
        for (let i = 0; i < 7; i++) {
          const lifeCard = player.drawCard();
          if (lifeCard) {
            player.setLifePoints(lifeCard);
          }
        }
      }

      // Draw initial hand of 7 cards
      for (let i = 0; i < 7; i++) {
        const handCard = player.drawCard();
        if (handCard) {
          player.addToHand(handCard);
        }
      }
    });
  }

  nextPhase(): void {
    const phases: Phases[] = [
      "Start Phase",
      "Movement Phase",
      "Main Phase",
      "Attack Phase",
      "End Phase",
    ];
    const currentIndex = phases.indexOf(this.phase);
    this.phase = phases[(currentIndex + 1) % phases.length];

    if (this.phase === "Start Phase") {
      this.endTurn();
    }
  }

  endTurn(): void {
    this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length;
    this.turnCount++;
    console.log(`turn ended`);
  }

  getActivePlayer(): Player {
    return this.players[this.activePlayerIndex];
  }

  endGame(): void {
    this.gameOver = true;
    console.log(`game over`);
  }

  /**
   * this method will return the board of the player with the given id
   * @param playerId
   * @returns {GameBoard}
   */
  getBoard(playerId: string): GameBoard {
    return this.board.get(playerId)!;
  }

  public getInactivePlayer(): Player {
    return (
      this.players.find(
        (p) => p.id !== this.players[this.activePlayerIndex].id
      ) || this.players[0]
    );
  }
}
