import { CardType } from "../../types";
import { Card } from "./Card";

export class ActionPointCard extends Card {
  constructor(name: string, description: string, cardType: CardType) {
    super(
      name,
      description,
      cardType,
      "None",
      "None",
      "None",
      "None",
      "None",
      "None"
    );
    this.uniqueId = "unique-action-id"; // Set this appropriately later
    this.owner = null;
    this.isFaceUp = false;
    this.isRested = true;
  }

  flip(): boolean {
    this.isFaceUp = !this.isFaceUp;
    console.log(
      `ActionPointCard is now ${this.isFaceUp ? "face up" : "face down"}`
    );
    return this.isFaceUp;
  }
}
