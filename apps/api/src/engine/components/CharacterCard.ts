import type {
  CardType,
  Trigger,
  TriggerEffect,
  Keyword,
  KeywordAbility,
  ActivationTimingAbility,
  ActivationCondition,
} from "../../types";
import { Card } from "./Card";

export class CharacterCard extends Card {
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
      true
    );
  }
}
