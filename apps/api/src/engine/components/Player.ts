import type { Card, ActionPointCard } from "../../types/index";

export class Player {
  public id: string;
  public name: string;
  public lifePoints: Card[];
  public deck: Card[];
  public hand: Card[];
  public actionPoints: ActionPointCard[];
  public removalArea: Card[];
  public sideline: Card[];
  public mulligan: boolean;
  public turnCount: number;
  public payApToDraw: boolean;

  constructor(name: string, deck: Card[], actionPoints: ActionPointCard[]) {
    this.id = "hello"; // generate this later
    this.name = name;
    this.lifePoints = [];
    this.deck = this.shuffleDeck(deck);
    this.hand = [];
    this.removalArea = [];
    this.sideline = [];
    this.mulligan = false;
    this.turnCount = 1;
    this.payApToDraw = false;
    this.actionPoints = actionPoints;
  }

  private shuffleDeck(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], (deck[j] = deck[j]), deck[i]];
    }
    return deck;
  }

  drawCard(): Card | null {
    if (this.deck.length === 0) {
      console.log(`no cards left`);
      return null;
    }
    const card = this.deck.shift();
    return card || null;
  }

  addToHand(card: Card): void {
    this.hand.push(card);
  }

  playCard(cardIndex: number): Card | null {
    if (cardIndex < 0 || cardIndex >= this.hand.length) {
      console.log(`invalid`);
      return null;
    }
    const [card] = this.hand.splice(cardIndex, 1);
    console.log(`played a card`);
    return card;
  }

  sendToSideline(card: Card): void {
    this.sideline.push(card);
  }

  sendToRemovalArea(card: Card): void {
    this.removalArea.push(card);
  }

  setLifePoints(card: Card): void {
    this.lifePoints.push(card);
  }

  takeDamage(cardIdx: number): void {
    this.lifePoints[cardIdx].flip();

    console.log(`player took damage`);
  }

  hasLost(): boolean {
    console.log(`You have lost. Goodbye.`);
    return true;
  }

  getHand(): Card[] {
    return this.hand;
  }

  getSideline(): Card[] {
    return this.sideline;
  }

  getRemovalArea(): Card[] {
    return this.removalArea;
  }
}
