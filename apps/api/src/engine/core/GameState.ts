import type { Player, Card, Phases } from "../../types";

export class GameState {
  players: Player[];
  activePlayerIndex: number;
  turnCount: number;
  phase: Phases;
  board: Map<string, { frontLine: Card[]; energyLine: Card[] }>;
  deck: Map<string, Card[]>;
  sideline: Map<string, Card[]>;
  RemovalArea: Map<string, Card[]>;

  constructor(players: Player[]) {
    this.players = players;
    this.activePlayerIndex = 0;
    this.turnCount = 1;
    this.phase = "Draw";
    this.board = new Map();
    this.sideline = new Map();
    this.RemovalArea = new Map();
    this.deck = new Map();

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
      });

      // empty sidelines
      this.sideline.set(player.id, []);

      // empty removal area
      this.RemovalArea.set(player.id, []);

      // fill the deck
      this.deck.set(player.id, [...player.deck]);
    });
  }

  nextPhase(): void {
    const phases: Phases[] = ["Draw", "Main"];
    const currentIndex = phases.indexOf(this.phase);
    this.phase = phases[(currentIndex + 1) % phases.length];

    if (this.phase === "Draw") {
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
}
