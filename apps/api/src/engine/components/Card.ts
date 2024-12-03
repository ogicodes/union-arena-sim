import type { CardType } from "../../types";

export class Card {
  public name: string;
  public description: string;
  public cardType: CardType;
  public uniqueId: string;
  public owner: string | null;
  public isFaceUp: boolean;

  constructor(name: string, description: string, cardType: CardType) {
    this.name = name;
    this.description = description;
    this.cardType = cardType;
    this.uniqueId = "fudge is good"; // set this later on using a fn
    this.owner = null;
    this.isFaceUp = false;
  }

  flip(): boolean {
    this.isFaceUp = !this.isFaceUp;
    console.log(`face up now`);
    return this.isFaceUp;
  }

  activateEffect(context: any): void {
    console.log(`${context}`);
  }
}
