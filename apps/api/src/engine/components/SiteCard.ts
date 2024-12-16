import type {
  ActivationCondition,
  ActivationTimingAbility,
  CardType,
  Keyword,
  KeywordAbility,
  Trigger,
  TriggerEffect,
} from "../../types";
import { Card } from "./Card";

export class SiteCard extends Card {
  constructor(
    name: string,
    description: string,
    cardType: CardType,
    trigger: Trigger,
    triggerEffect: TriggerEffect,
    keyword: Keyword,
    keywordAbility: KeywordAbility,
    activationTimingAbility: ActivationTimingAbility,
    activationCondition: ActivationCondition,
    cost: number,
    generatedEnergy: number
  ) {
    super(
      name,
      description,
      cardType,
      trigger,
      triggerEffect,
      keyword,
      keywordAbility,
      activationTimingAbility,
      activationCondition,
      cost,
      generatedEnergy,
      false
    );
  }
}
