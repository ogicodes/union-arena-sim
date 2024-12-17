import { ActivationTimingAbility } from "../types";

export const parseActivationTimingAbilities = (
  effectData: string
): ActivationTimingAbility[] => {
  let activationTimingAbility: ActivationTimingAbility[] = [];

  if (effectData?.toLowerCase().includes("when-played")) {
    activationTimingAbility.push("When Played");
  }
  if (effectData?.toLowerCase().includes("raid")) {
    activationTimingAbility.push("Raid");
  }
  if (effectData?.toLowerCase().includes("when-sidelined")) {
    activationTimingAbility.push("When Sidelined");
  }
  if (effectData?.toLowerCase().includes("when-attacking")) {
    activationTimingAbility.push("When Attacking");
  }
  if (effectData?.toLowerCase().includes("when-blocking")) {
    activationTimingAbility.push("When Blocking");
  }
  if (effectData?.toLowerCase().includes("during-your-turn")) {
    activationTimingAbility.push("During Your Turn");
  }
  if (effectData?.toLowerCase().includes("during-opponent's-turn")) {
    activationTimingAbility.push("During Opponent's Turn");
  }
  if (effectData?.toLowerCase().includes("activate:-main")) {
    activationTimingAbility.push("Activate: Main");
  }
  return activationTimingAbility;
};
