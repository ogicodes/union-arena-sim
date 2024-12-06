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
  public description: string;
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

  constructor(
    name: string,
    description: string,
    cardType: CardType,
    trigger: Trigger,
    triggerEffect: TriggerEffect,
    keyword: Keyword,
    keywordAbility: KeywordAbility,
    activationTimingAbility: ActivationTimingAbility,
    activationCondition: ActivationCondition
  ) {
    this.name = name;
    this.description = description;
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
  }

  activateCard(): boolean {
    this.isRested = !this.isRested;
    console.log(`Card is now active.`);
    return this.isRested;
  }

  restCard(): boolean {
    this.isRested = !this.isRested;
    console.log(`Card is rested.`);
    return this.isRested;
  }

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

  activateCardEffect(): boolean {
    if (this.activationCondition === "None") {
      console.log(`no activation condition`);
      return false;
    }
    console.log(`activated`);
    return true;
  }
}
