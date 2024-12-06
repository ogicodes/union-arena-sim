import type { Player, Card, Phases } from "../../types";

export class GameState {
  players: Player[];
  activePlayerIndex: number;
  turnCount: number;
  phase: Phases;
  board: Map<
    string,
    { frontLine: Card[]; energyLine: Card[]; actionPointsLine: Card[] }
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
      this.board.set(player.id, {
        frontLine: new Array(4).fill(null),
        energyLine: new Array(4).fill(null),
        actionPointsLine: new Array(3).fill(null),
      });

      // empty sidelines
      this.sideline.set(player.id, []);

      // empty removal area
      this.RemovalArea.set(player.id, []);

      // fill the deck
      this.deck.set(player.id, [...player.deck]);

      // draw initial hand of 7 cards and set 7 life points
      for (let i = 0; i < 7; i++) {
        const card = player.drawCard();
        const card2 = player.drawCard();

        if (card && card2) {
          player.setLifePoints(card);
          player.addToHand(card2);
        } else {
          this.endGame();
          return;
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
}
