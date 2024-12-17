import { Card } from "../../../src/engine/components/Card";
import { beforeEach, describe, it, expect } from "@jest/globals";
import type {
  CardType,
  Trigger,
  TriggerEffect,
  Keyword,
  KeywordAbility,
  ActivationTimingAbility,
  ActivationCondition,
  CardColor,
  BpData,
  AttributeData,
  GeneratedEnergyData as GeneratedEnergyDataType,
} from "../../../src/types";

describe("Card Class", () => {
  let card: Card;

  const mockCard = {
    name: "Test Card",
    effectData: "Test Effect",
    cardType: "Monster" as CardType,
    trigger: "Draw" as Trigger,
    triggerEffect: "Draw 1" as TriggerEffect,
    keyword: "Test Keyword" as Keyword,
    keywordAbility: "Test Ability" as KeywordAbility,
    activationTimingAbility: "Anytime" as ActivationTimingAbility,
    activationCondition: "None" as ActivationCondition,
    apCost: 2,
    isRaidable: true,
    generatedEnergyData: 2 as GeneratedEnergyDataType,
    color: "blue" as CardColor,
    bpData: 1000 as BpData,
    attributeData: "None" as AttributeData,
    needEnergyData: 1,
  };

  beforeEach(() => {
    card = new Card(
      mockCard.name,
      mockCard.effectData,
      mockCard.cardType,
      mockCard.trigger,
      mockCard.triggerEffect,
      mockCard.keyword,
      mockCard.keywordAbility,
      [mockCard.activationTimingAbility],
      mockCard.activationCondition,
      mockCard.apCost,
      mockCard.isRaidable,
      mockCard.color,
      mockCard.bpData,
      mockCard.attributeData,
      mockCard.needEnergyData,
      mockCard.generatedEnergyData
    );
  });

  it("should initialize a card correctly", () => {
    expect(card.name).toBe(mockCard.name);
    expect(card.effectData).toBe(mockCard.effectData);
    expect(card.cardType).toBe(mockCard.cardType);
    expect(card.isFaceUp).toBe(false);
    expect(card.isRested).toBe(true);
    expect(card.uniqueId).toBe("fudge is good");
  });
});
