/**
 * this function parses the effect data and returns a string of the effects
 * @param data - the effect data
 * @returns string - the effects
 */
export function parseEffects(effectData: string | null): string[] {
  if (!effectData) return [];
  return effectData.split("%").map((effect) => effect.trim());
}

/**
 * this function checks if the effect data contains "raid"
 * @param data - the effect data
 * @returns boolean - true if the effect data contains "raid", false otherwise
 */
export const containsRaid = (data: string): boolean => {
  return data.includes("raid");
};

/**
 * this function gets the raid target from the effect data
 * @param data - the effect data
 * @returns string - the raid target
 */
export function getRaidTarget(effects: string[]): string {
  const raidEffect = effects.find((effect) => effect.includes("raid"));
  return raidEffect?.split("<")[1]?.split(">")[0] || "";
}
