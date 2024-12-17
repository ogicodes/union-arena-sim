import { Card } from "../engine/components/Card";
import {
  FormattedCard,
  CardType,
  Trigger,
  TriggerEffect,
  CardColor,
  BpData,
  AttributeData,
  GeneratedEnergyData,
  Keyword,
  ActivationCondition,
  ActivationTimingAbility,
  KeywordAbility,
} from "../types";
import { parseActivationTimingAbilities } from "./parse-activation-timing-abilities";

export const createCard = (cardData: FormattedCard): Card => {
  // Parse trigger data (if available)
  let trigger: Trigger = "None";
  let triggerEffect: TriggerEffect = "None";
  let keyword: Keyword = "None";
  let keywordAbility: KeywordAbility = "None";
  let activationCondition: ActivationCondition = "None";

  if (cardData.triggerData) {
    const [parsedTrigger, parsedTriggerEffect] =
      cardData.triggerData.split("%");
    trigger = parsedTrigger as Trigger;
    triggerEffect = parsedTriggerEffect as TriggerEffect;
  }

  const activationTimingAbility = parseActivationTimingAbilities(
    cardData.effectData ?? ""
  );

  return new Card(
    cardData.name,
    cardData.effectData ?? "No Effect",
    cardData.categoryData as CardType,
    trigger,
    triggerEffect,
    "None", // Keyword
    "None", // KeywordAbility
    activationTimingAbility, // ActivationTimingAbility
    "None", // ActivationCondition
    cardData.apData,
    false, // isRaidable
    cardData.color as CardColor,
    cardData.bpData as BpData,
    cardData.attributeData as AttributeData,
    cardData.needEnergyData as number,
    cardData.generatedEnergyData as GeneratedEnergyData
  );
};
