import { GameState } from "./GameState";
import type { Player } from "../../types";
import { TurnManager } from "./TurnManager";

export class GameEngine {
  private gameState;
  public turnManager;

  constructor(players: Player[]) {
    this.gameState = new GameState(players);
    this.turnManager = new TurnManager(this.gameState);
  }

  public startGame(): void {
    console.log(`game has started`);
    this.gameState.initialize();

    const hasLost = this.gameState.players.some(
      (player) => player.lifePoints.length <= 0
    );
    const hasCards = this.gameState.players.some(
      (player) => player.deck.length > 0
    );

    while (!hasLost && hasCards && !this.gameState.gameOver) {
      this.turnManager.nextPhase();
    }
  }
}
