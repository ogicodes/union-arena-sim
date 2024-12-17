import { createCard } from "../../src/utils/card-factory";
import { Card } from "../../src/engine/components/Card";
import { FormattedCard, CardType } from "../../src/types";
import { describe, it, expect } from "@jest/globals";

describe("Card Factory", () => {
  it("should create a Card instance with all properties mapped correctly", () => {
    const mockCardData: FormattedCard = {
      cardNo: "UE01BT/BLC-1-001",
      rarity: "c",
      name: "asguiaro ebern",
      seriesName: "bleach: thousand-year blood war",
      series: "blc",
      needEnergyData: 0,
      color: "yellow",
      apData: 1,
      categoryData: "character",
      bpData: 2000,
      attributeData: null,
      generatedEnergyData: 1,
      effectData:
        "step%(during-your-movement-phase|-you-may-move-this-card-from-your-front-line-to-your-energy-line.)",
      triggerData: null,
      getInfoData: null,
    };

    const card = createCard(mockCardData);

    // Check instance type
    expect(card).toBeInstanceOf(Card);

    // Check property mappings
    expect(card.name).toBe(mockCardData.name);
    expect(card.effectData).toBe(mockCardData.effectData);
    expect(card.cardType).toBe(mockCardData.categoryData as CardType);
    expect(card.apCost).toBe(mockCardData.apData);
    expect(card.needEnergyData).toBe(mockCardData.needEnergyData);
    expect(card.generatedEnergyData).toBe(mockCardData.generatedEnergyData);

    // Check derived properties
    expect(card.uniqueId).toBeDefined(); // Ensure uniqueId is set
    expect(card.isRaidable).toBe(false); // Derived from `categoryData` being "character"
    expect(card.trigger).toBe("None"); // Default value for trigger
  });
});
