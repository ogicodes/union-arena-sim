import type { Card } from "../../types/index";

export class Player {
  public id: string;
  public name: string;
  public lifePoints: number;
  public deck: Card[];
  public hand: Card[];
  public removalArea: Card[];
  public sideline: Card[];

  constructor(name: string, deck: Card[]) {
    this.id = "hello"; // generate this later
    this.name = name;
    this.lifePoints = 8000;
    this.deck = this.shuffleDeck(deck);
    this.hand = [];
    this.removalArea = [];
    this.sideline = [];
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
    if (card) {
      this.hand.push(card);
    }
    return card || null;
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

  takeDamage(damage: number): void {
    this.lifePoints -= damage;
    console.log(`player took damage`);
  }

  hasLast(): boolean {
    return this.lifePoints <= 0;
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
