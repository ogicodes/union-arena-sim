import { GameState } from "./GameState";
import type { Player } from "../../types";

export class GameEngine {
  private gameState;

  constructor(players: Player[]) {
    this.gameState = new GameState(players);
  }

  public startGame(): void {
    console.log(`game has started`);
    this.gameState.initialize();
    this.startTurn();
  }

  public nextPhase(): void {
    switch (this.gameState.phase) {
      case "Draw":
        this.handleDrawPhase();
        this.gameState.phase = "Main";
        break;
      case "Main":
        console.log("Main phase actions");
        this.gameState.phase = "Main";
        break;
    }
  }

  private startTurn(): void {
    console.log(`Starting turn for player`);
  }

  private handleDrawPhase(): void {}
}
