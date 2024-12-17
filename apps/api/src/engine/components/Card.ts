import type {
  CardType,
  Trigger,
  TriggerEffect,
  Keyword,
  KeywordAbility,
  ActivationTimingAbility,
  ActivationCondition,
  BpData,
  CardColor,
  GeneratedEnergyData,
  AttributeData,
} from "../../types";

export class Card {
  public name: string;
  public effectData: string;
  public cardType: CardType;

  public uniqueId: string;
  public owner: string | null;

  public isFaceUp: boolean;
  public isRested: boolean;

  public trigger: Trigger;
  public triggerEffect: TriggerEffect;

  public keyword: Keyword;
  public keywordAbility: KeywordAbility;

  public activationTimingAbility: ActivationTimingAbility[];
  public activationCondition: ActivationCondition;

  public needEnergyData: number;
  public apCost: number;
  public isRaidable: boolean;
  public color: CardColor;
  public bpData: BpData;
  public attributeData: AttributeData;
  public generatedEnergyData: GeneratedEnergyData;

  constructor(
    name: string,
    effectData: string,
    cardType: CardType,
    trigger: Trigger,
    triggerEffect: TriggerEffect,
    keyword: Keyword,
    keywordAbility: KeywordAbility,
    activationTimingAbility: ActivationTimingAbility[],
    activationCondition: ActivationCondition,
    apCost: number,
    isRaidable: boolean,
    color: CardColor,
    bpData: BpData,
    attributeData: AttributeData,
    needEnergyData: number,
    generatedEnergyData: GeneratedEnergyData
  ) {
    this.name = name;
    this.effectData = effectData;
    this.cardType = cardType;
    this.uniqueId = "fudge is good"; // set this later on using a fn
    this.owner = null;
    this.isFaceUp = false;
    this.isRested = true;
    this.trigger = trigger;
    this.triggerEffect = triggerEffect;
    this.keyword = keyword;
    this.keywordAbility = keywordAbility;
    this.activationTimingAbility = activationTimingAbility;
    this.activationCondition = activationCondition;
    this.generatedEnergyData = generatedEnergyData;
    this.apCost = apCost;
    this.isRaidable = isRaidable;
    this.color = color;
    this.bpData = bpData;
    this.attributeData = attributeData;
    this.needEnergyData = needEnergyData;
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

  /**
   * Flip the card face up and activate its trigger if present.
   * @param gameState - The current game state
   * @returns Card - The flipped card
   */
  flip(/*gameState: GameState */): Card | null {
    this.isFaceUp = !this.isFaceUp;
    console.log(`Card flipped: ${this.isFaceUp ? "Face Up" : "Face Down"}`);

    if (this.isFaceUp && this.trigger !== "None") {
      console.log(`Trigger activated: ${this.trigger}`);
      this.activateTrigger(/*gameState*/);
    }

    return this.isFaceUp ? this : null;
  }

  /**
   * Activate the card's trigger effect.
   */
  activateTrigger(/*gameState: GameState */): void {
    if (this.triggerEffect !== "None") {
      console.log(`Trigger Effect: ${this.triggerEffect}`);
      // Add logic to handle each trigger effect
      switch (this.trigger) {
        case "Raid":
          console.log(
            "Effect: Add this card to your hand, or if you have the required energy, perform Raid with it."
          );
          // Example: Write the logic to handle this trigger
          break;
        case "Color":
          console.log(
            "Effect: Choose one character with 3500 or less BP on your opponent's front line and return it to their hand."
          );
          // Example: Write the logic to handle this trigger
          break;
        case "Special":
          console.log(
            "Effect: Choose one character on your oponents field and sideline it."
          );
          // Example: Write the logic to handle this trigger
          break;
        case "Final":
          console.log(
            "Effect: If you have zero life, place the top card of your deck into your life area."
          );
          // Example: Write the logic to handle this trigger
          break;
        case "Draw":
          console.log("Effect: Draw 1 Card.");
          // Example: Write the logic to handle this trigger
          break;
        case "Get":
          console.log("Effect: Add this card to your hand.");
          // Example: Write the logic to handle this trigger
          break;
        case "Active":
          console.log(
            "Effect: Choose one character on your field and switch it to active. It Gains 3000 BP until the end of the turn."
          );
          // Example: Write the logic to handle this trigger
          break;
        default:
          console.log("Trigger effect handled.");
          break;
      }
    } else {
      console.log("No trigger effect available.");
    }
  }

  /**
   * this function takes the current card and activates the card effect
   * @returns boolean - returns true if the card is activated
   */
  activateCardEffect(): boolean {
    if (this.activationCondition === "None") {
      console.log(`no activation condition`);
      return false;
    }
    console.log(`activated`);
    return true;
  }

  /**
   * this function take the current card and deactivates the card effect
   * @returns boolean - returns false if the card is not activated
   */
  deactivateCardEffect(): boolean {
    console.log(`deactivated`);
    return false;
  }

  /**
   * this function takes the current card and raids it
   * @returns boolean - returns true if the card is raided
   */
  raidCard(): boolean {
    if (!this.isRaidable) {
      console.log(`card is not raidable`);
      return false;
    }
    console.log(`raided`);
    return true;
  }

  /**
   * this function takes the current card and increments or decrements the bp data
   * @returns BpData - increments or decrements the bp data
   */
  updateBpData(bpData: BpData): BpData {
    if (bpData && this.bpData) {
      this.bpData = (
        bpData > 0 ? this.bpData - bpData : this.bpData + bpData
      ) as BpData;
      return this.bpData;
    }
    return this.bpData;
  }
}
