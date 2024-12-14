import type {
  CardType,
  Trigger,
  TriggerEffect,
  Keyword,
  KeywordAbility,
  ActivationTimingAbility,
  ActivationCondition,
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

  public activationTimingAbility: ActivationTimingAbility;
  public activationCondition: ActivationCondition;

  public needEnergyData: number;
  public generatedEnergyData: number;
  public apCost: number;
  public isRaidable: boolean;
  constructor(
    name: string,
    effectData: string,
    cardType: CardType,
    trigger: Trigger,
    triggerEffect: TriggerEffect,
    keyword: Keyword,
    keywordAbility: KeywordAbility,
    activationTimingAbility: ActivationTimingAbility,
    activationCondition: ActivationCondition,
    apCost: number,
    isRaidable: boolean
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
    this.needEnergyData = 0;
    this.generatedEnergyData = 0;
    this.apCost = apCost;
    this.isRaidable = isRaidable;
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
   * this function takes the current card and flips it face up
   * @returns boolean - returns true if the card is face up
   */
  flip(): boolean {
    this.isFaceUp = !this.isFaceUp;
    console.log(`face up now`);
    if (this.trigger !== "None") {
      console.log(this.triggerEffect);
    } else {
      console.log(`no trigger`);
    }
    return this.isFaceUp;
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
}
