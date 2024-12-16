import { Card } from "../engine/components/Card";
import { FormattedCard, CardType, Trigger, TriggerEffect } from "../types";

export const createCard = (cardData: FormattedCard): Card => {
  // Parse trigger data (if available)
  let trigger: Trigger = "None";
  let triggerEffect: TriggerEffect = "None";

  if (cardData.triggerData) {
    const [parsedTrigger, parsedTriggerEffect] =
      cardData.triggerData.split("%");
    trigger = parsedTrigger as Trigger;
    triggerEffect = parsedTriggerEffect as TriggerEffect;
  }

  return new Card(
    cardData.name,
    cardData.effectData ?? "No Effect",
    cardData.categoryData as CardType,
    trigger,
    triggerEffect,
    "None", // Keyword
    "None", // KeywordAbility
    "None", // ActivationTimingAbility
    "None", // ActivationCondition
    cardData.apData,
    cardData.generatedEnergyData,
    cardData.categoryData === "character" // isRaidable is true for characters
  );
};
