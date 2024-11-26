import { GameState } from "./GameState";
import { TurnManager } from "./TurnManager";
import type { Player } from "../../types";

export class GameEngine {
  private gameState;
  private turnManager;

  constructor(players: Player[]) {
    this.gameState = new GameState(players);
    this.turnManager = new TurnManager(this.gameState);
  }

  startGame(): void {
    console.log(`game has started`);
    this.gameState.initialize();
    this.startTurn();
  }

  private startTurn(): void {
    console.log(`Starting turn for player`);
  }
}
