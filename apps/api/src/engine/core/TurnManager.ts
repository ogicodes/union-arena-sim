import { GameState } from "./GameState";

export class TurnManager {
  gameState: GameState;

  constructor(gameState: GameState) {
    this.gameState = gameState;
  }

  startTurn(): void {
    const activePlayer = this.gameState.getActivePlayer();
    console.log(`starting turn for ${activePlayer.name}`);
    this.gameState.phase = "Draw";
    this.drawPhase();
  }

  drawPhase(): void {
    const activePlayer = this.gameState.getActivePlayer();
    const playerDeck = this.gameState.deck.get(activePlayer.id);

    if (!playerDeck || playerDeck.length === 0) {
      console.log(`no cards`);
      return;
    }

    const drawnCard = playerDeck.shift();
    if (drawnCard) {
      activePlayer.hand.push(drawnCard);
      console.log(`card drawn`);
    }

    this.gameState.nextPhase();
  }

  mainPhase(): void {
    console.log(`main phase.`);
    this.gameState.nextPhase();
  }

  endPhase(): void {
    console.log(`end phase`);
    this.gameState.endTurn();
    this.startTurn();
  }
}
