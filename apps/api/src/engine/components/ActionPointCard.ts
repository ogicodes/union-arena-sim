/**
 * ActionPointCard class represents a card that can be used to perform an action in the game.
 */
export class ActionPointCard {
  public name: string;
  public isFaceUp: boolean = false;
  public isRested: boolean = false;
  constructor(name: string) {
    this.name = name;
  }

  /**
   * this function takes the current card and flips it face up
   * @returns boolean - returns true if the card is face up
   */
  flip(): boolean {
    this.isFaceUp = !this.isFaceUp;
    console.log(`face up is now ${this.isFaceUp}`);
    return this.isFaceUp;
  }

  /**
   * this function takes the current card and activates the card
   * @returns boolean - returns true if the card is active
   */
  activateCard(): boolean {
    this.isRested = !this.isRested;
    console.log(`Card is now active.`);
    return this.isRested;
  }

  /**
   * this function takes the current card and rests it
   * @returns boolean - returns true if the card is rested
   */
  restCard(): boolean {
    this.isRested = !this.isRested;
    console.log(`Card is rested.`);
    return this.isRested;
  }
}
