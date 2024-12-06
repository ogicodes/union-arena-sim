import { GameState, Phases } from "../../types";

export class TurnManager {
  public phase: Phases;
  private gameState: GameState;
  public payApToDraw: boolean;

  constructor(gamestate: GameState) {
    this.phase = "Start Phase";
    this.gameState = gamestate;
    payApToDraw = false;
  }

  public nextPhase(): void {
    switch (this.phase) {
      case "Start Phase":
        this.handleStartPhase();
        console.log("Start phase actions");
        this.phase = "Main Phase";
        break;
      case "Movement Phase":
        this.handleMovementPhase();
        console.log("Movement phase actions");
        this.phase = "Movement Phase";
        break;
      case "Main Phase":
        this.handleMainPhase();
        console.log("Main phase actions");
        this.phase = "Main Phase";
        break;
      case "Attack Phase":
        this.handleAttackPhase();
        console.log("Attack phase actions");
        this.phase = "Attack Phase";
        break;
      case "End Phase":
        this.handleEndPhase();
        console.log("End phase actions");
        this.phase = "End Phase";
        break;
    }
  }

  private handleStartPhase(): void {
    // abilities that state they are active until the start of your next turn, and other similarly phrased abilities, become inactive.

    // Switch all resting cards to active
    this.gameState.getActivePlayer().frontLine.card.activateCard()
    this.gameState.getActivePlayer().energyLine.card.activateCard()

    //Make sure you have the appropriate number of AP cards in your AP area for the current turn
    if (this.gameState.turnCount === 1) {
      this.gameState.getActivePlayer().actionPointsLine = 1 
      this.gameState.getActivePlayer().actionPointsLine.card.activateCard
      console.log(`AP count is 1`)
    } if (this.gameState.turnCount === 2 || 3 || 4) {
      this.gameState.getActivePlayer().actionPointsLine = 2 
      this.gameState.getActivePlayer().actionPointsLine.card.activateCard
      console.log(`AP count is 3`)
    } else {
      this.gameState.getActivePlayer().actionPointsLine = 3 
      this.gameState.getActivePlayer().actionPointsLine.card.activateCard
      console.log(`AP count is 3`)
    }

    // Draw a card (player 1 does not draw in their first turn)
    if (this.gameState.turnCount > 1) {
      this.gameState.getActivePlayer().drawCard();
    }
    // Once per turn you may pay 1 AP (by switching an AP card to resting) to draw a card
    if (payApToDraw === true) {
      this.gameState.getActivePlayer().actionPointsLine[0].card.restCard()
      this.gamestate.getActivePlayer().drawCard()
    }
  }

  private handleMovementPhase(): void {
    // You may move any number of characters from your Energy line to your Front line. if you do not have enough space on your Front line for all characters, you must move characters from your Front line to your removal area first
  }

  private handleMainPhase(): void {
    // any of these can happen in any order
    // play a card from your hand to your Energy line
    // play a card from your hand to your Front line
    // perform Raid on a card
    // Play a site card
    // play an event card
    // use the Activate: Main ability of a card
  }

  private handleAttackPhase(): void {
    // You can attack with one active character on your front line at a time, and you must switch it to resting when it attacks. If you still have active characters after you complete an attack you can attack with them in the same manner
    // you can only target your opponents life points with your attacks
    // cards can not be used during your attack phase
    // you do not pay AP when attacking
  }

  private handleEndPhase(): void {
    // if there are any abilities that activate at the start of the end phase, activate and resolve them now.

    // switch all resting cards to active.
    this.gameState.getActivePlayer().frontLine.card.activateCard()
    this.gameState.getActivePlayer().energyLine.card.activateCard()
    this.gameState.getActivePlayer().actionPointsLine.card.activateCard()

    // if you have more than 8 cards in your hand, chose cards to discard until you have 8 cards in your hand
    if (this.gameState.getActivePlayer().hand > 8 ) {
      this.gamestate.getActivePlayer().hand.card.sendToRemovalArea()
    }

    // any abilities that state that they are active until the end of the turn now become inactive
  }
}
